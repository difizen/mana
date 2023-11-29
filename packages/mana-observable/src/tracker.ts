/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPropertyDescriptor, isPlainObject, noop } from '@difizen/mana-common';

import { ObservableSymbol } from './core';
import { Notifiable } from './notifiable';
import { Notifier } from './notifier';
import { observable } from './observable';
import { Observability } from './utils';

type Act = (...args: any) => void;

function getValue<T extends Record<any, any>>(
  target: T,
  property: string | symbol,
  proxy: T,
  notifier?: Notifier,
) {
  if (!notifier) {
    const descriptor = getPropertyDescriptor(target, property);
    if (descriptor?.get) {
      return descriptor.get.call(proxy);
    }
  }
  return target[property as any];
}

function handleNotifier<T extends Record<string, any>>(
  notifier: Notifier,
  act: Act,
  target: T,
  property?: string,
) {
  Notifier.once(
    notifier,
    () => {
      if (property) {
        act({
          key: property as keyof T,
          value: target[property],
        });
      } else {
        act(target);
      }
    },
    target,
    property,
  );
}

export type Trackable = {
  [ObservableSymbol.Tracker]: Record<string, any>;
  [Trackable.activator]?: (() => void) | undefined;
};

export namespace Trackable {
  export const activator = Symbol('activator');

  export function is(target: any): target is Trackable {
    return (
      Observability.canBeObservable(target) && (target as any)[ObservableSymbol.Tracker]
    );
  }
  export function getOrigin(target: Trackable): any {
    return target[ObservableSymbol.Tracker];
  }
  export function tryGetOrigin(target: any): any {
    if (!is(target)) {
      return target;
    }
    return getOrigin(target);
  }
}
export namespace Tracker {
  export function set<T extends Record<any, any> = any>(target: T, act: Act, proxy: T) {
    Reflect.defineMetadata(act, proxy, target, ObservableSymbol.Tracker);
  }
  export function get<T extends Record<any, any> = any>(
    target: T,
    act: Act,
  ): (T & Trackable) | undefined {
    return Reflect.getMetadata(act, target, ObservableSymbol.Tracker);
  }
  export function has<T extends Record<any, any> = any>(target: T, act: Act) {
    return Reflect.hasOwnMetadata(act, target, ObservableSymbol.Tracker);
  }

  export function tramsform(toTrack: any, act: Act, activator?: () => void) {
    if (toTrack instanceof Array) {
      return transformArray(toTrack, act, activator);
    }
    if (toTrack instanceof Map) {
      return transformMap(toTrack, act, activator);
    }
    if (isPlainObject(toTrack)) {
      return transformPlainObject(toTrack, act, activator);
    }
    return toTrack;
  }
  export function transformArray(toTrack: any[], act: Act, activator?: () => void) {
    return new Proxy(toTrack, {
      get(target: any, property: string | symbol): any {
        const value = target[property];
        if (property === ObservableSymbol.Self) {
          return value;
        }
        if (property === Trackable.activator) {
          return activator;
        }
        return track(value, act);
      },
    });
  }

  export function transformPlainObject(toTrack: any, act: Act, activator?: () => void) {
    return new Proxy(toTrack, {
      get(target: any, property: string | symbol): any {
        const value = target[property];
        if (property === ObservableSymbol.Self) {
          return value;
        }
        if (property === Trackable.activator) {
          return activator;
        }
        return track(value, act);
      },
    });
  }

  export function transformMap(
    toTrack: Map<any, any>,
    act: Act,
    activator?: () => void,
  ) {
    return new Proxy(toTrack, {
      get(target: any, property: string | symbol): any {
        const value = target[property];
        if (property === ObservableSymbol.Self) {
          return value;
        }
        if (property === Trackable.activator) {
          return activator;
        }
        if (property === 'get' && typeof value === 'function') {
          return function (...args: any[]) {
            const innerValue = value.apply(target, args);
            return track(innerValue, act);
          };
        }
        return value;
      },
    });
  }

  export function toInstanceTracker<T extends Record<any, any>>(
    exist: T | undefined,
    origin: T,
    act: Act,
  ) {
    if (exist) {
      return exist;
    }
    // try make observable
    if (!Observability.marked(origin)) {
      observable(origin);
    }

    const proxy = new Proxy(origin, {
      get(target: any, property: string | symbol): any {
        if (property === ObservableSymbol.Tracker) {
          return target;
        }
        if (property === ObservableSymbol.Self) {
          return target;
        }
        let notifier;
        let value;
        if (typeof property === 'string') {
          if (Observability.marked(target, property)) {
            notifier = Notifier.getOrCreate(target, property);
            handleNotifier(notifier, act, target, property);
            value = getValue(target, property, proxy, notifier);
            return track(value, act, true);
          }
          const descriptor = getPropertyDescriptor(target, property);
          if (descriptor?.get) {
            return descriptor.get.call(proxy);
          }
        }
        value = target[property];
        return track(value, act, true);
      },
    });
    set(origin, act, proxy);
    return proxy;
  }
  export function toNotifiableTracker<T extends Record<any, any>>(
    exist: T | undefined,
    origin: T,
    act: Act,
    asProperty: boolean,
  ) {
    if (exist) {
      return exist;
    }
    let maybeNotifiable: T = Notifiable.get(origin);
    if (!maybeNotifiable) {
      maybeNotifiable = Notifiable.transform(origin);
    }
    // set reactable listener

    let activator;
    if (!asProperty && Notifiable.is(maybeNotifiable)) {
      const notifier = Notifiable.getNotifier(maybeNotifiable);
      activator = () => {
        handleNotifier(notifier, act, origin);
      };
      activator();
    }
    const proxy = tramsform(maybeNotifiable, act, activator);
    set(origin, act, proxy);
    return proxy;
  }

  export function track<T extends Record<any, any>>(
    object: T,
    act: Act,
    asProperty = false,
  ): T {
    if (!Observability.canBeObservable(object)) {
      return object;
    }
    // get origin
    let origin = object;
    if (Trackable.is(object)) {
      origin = Trackable.getOrigin(object);
    }
    origin = Observability.getOrigin(origin);
    // already has tracker
    let exist: (T & Trackable) | undefined = undefined;
    if (has(origin, act)) {
      exist = get(origin, act);
      if (exist) {
        if (exist[Trackable.activator]) {
          exist[Trackable.activator]();
        }
        return exist;
      }
    }
    if (Notifiable.canBeNotifiable(origin)) {
      return toNotifiableTracker(exist, origin, act, asProperty);
    } else {
      return toInstanceTracker(exist, origin, act);
    }
  }
}
