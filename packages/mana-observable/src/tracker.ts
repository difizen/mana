/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPropertyDescriptor, isPlainObject } from '@difizen/mana-common';

import { ObservableSymbol } from './core';
import { Notifiable } from './notifiable';
import { Notifier } from './notifier';
import { observable } from './observable';
import { Observability } from './utils';

type Act = (...args: any) => void;

function getValue<T extends Record<any, any>>(
  obj: T,
  property: string | symbol,
  proxy: T,
  notifier?: Notifier,
) {
  if (!notifier) {
    const descriptor = getPropertyDescriptor(obj, property);
    if (descriptor?.get) {
      return descriptor.get.call(proxy);
    }
  }
  return obj[property as any];
}

function handleNotifier<T extends Record<string, any>>(
  notifier: Notifier,
  act: Act,
  obj: T,
  property?: string,
) {
  Notifier.once(
    notifier,
    () => {
      if (property) {
        act({
          key: property as keyof T,
          value: obj[property],
        });
      } else {
        act(obj);
      }
    },
    obj,
    property,
  );
}

export type Trackable = {
  [ObservableSymbol.Tracker]: Record<string, any>;
};

export namespace Trackable {
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

  export function tramsform(toTrack: any, act: Act) {
    if (toTrack instanceof Array) {
      return transformArray(toTrack, act);
    }
    if (toTrack instanceof Map) {
      return transformMap(toTrack, act);
    }
    if (isPlainObject(toTrack)) {
      return transformPlainObject(toTrack, act);
    }
    return toTrack;
  }
  export function transformArray(toTrack: any[], act: Act) {
    return new Proxy(toTrack, {
      get(target: any, property: string | symbol): any {
        const value = target[property];
        if (property === ObservableSymbol.Self) {
          return value;
        }
        if (Observability.canBeObservable(value)) {
          return track(value, act);
        }
        return value;
      },
    });
  }

  export function transformPlainObject(toTrack: any, act: Act) {
    return new Proxy(toTrack, {
      get(target: any, property: string | symbol): any {
        const value = target[property];
        if (property === ObservableSymbol.Self) {
          return value;
        }
        if (Observability.canBeObservable(value)) {
          return track(value, act);
        }
        return value;
      },
    });
  }

  export function transformMap(toTrack: Map<any, any>, act: Act) {
    return new Proxy(toTrack, {
      get(target: any, property: string | symbol): any {
        const value = target[property];
        if (property === ObservableSymbol.Self) {
          return value;
        }
        if (property === 'get' && typeof value === 'function') {
          return function (...args: any[]) {
            const innerValue = value.apply(target, args);
            if (Observability.canBeObservable(innerValue)) {
              return track(innerValue, act);
            }
            return innerValue;
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
    deep = true,
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
        if (typeof property === 'string') {
          if (Observability.marked(target, property)) {
            notifier = Notifier.getOrCreate(target, property);
            handleNotifier(notifier, act, target, property);
          }
        }
        const value = getValue(target, property, proxy, notifier);
        // if (Notifiable.is(value)) {
        //   const transformed = get(value, act);
        //   if (transformed) {
        //     return transformed;
        //   }
        //   const newValue = tramsform(value, act);
        //   set(value, act, newValue);
        //   return newValue;
        // }
        if (Observability.canBeObservable(value)) {
          if (Notifiable.canBeNotifiable(value)) {
            return track(value, act, false);
          }
          return track(value, act, deep);
        }
        return value;
      },
    });
    set(origin, act, proxy);
    return proxy;
  }
  export function toNotifiableTracker<T extends Record<any, any>>(
    exist: T | undefined,
    origin: T,
    object: T,
    act: Act,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _deep: boolean,
  ) {
    if (exist) {
      return exist;
    }
    let maybeNotifiable = object;
    // if (deep) {
    //   // try make reactable
    //   if (!Observability.is(origin)) {
    //     maybeNotifiable = observable(origin);
    //   }
    // }
    maybeNotifiable = Notifiable.get(origin);
    if (!maybeNotifiable) {
      maybeNotifiable = Notifiable.transform(origin);
    }
    // set reactable listener
    if (Notifiable.is(maybeNotifiable)) {
      const notifier = Notifiable.getNotifier(maybeNotifiable);
      handleNotifier(notifier, act, origin);
    }
    const proxy = tramsform(maybeNotifiable, act);
    set(origin, act, proxy);
    return proxy;
  }

  export function track<T extends Record<any, any>>(
    object: T,
    act: Act,
    deep = true,
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
    let exist: T | undefined = undefined;
    // already has tracker
    if (has(origin, act)) {
      exist = get(origin, act);
    }
    // get exist reactble
    if (Notifiable.canBeNotifiable(origin)) {
      return toNotifiableTracker(exist, origin, object, act, deep);
    } else {
      return toInstanceTracker(exist, origin, act, deep);
    }
  }
}
