/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPlainObject } from '@difizen/mana-common';

import { ObservableSymbol } from './core';
import { Notifier } from './notifier';
import { Observability } from './utils';

export interface Notifiable {
  [ObservableSymbol.Notifier]: Notifier;
}

export namespace Notifiable {
  export function is(target: any): target is Notifiable {
    return (
      Observability.trackable(target) && (target as any)[ObservableSymbol.Notifier]
    );
  }
  export function getNotifier(target: Notifiable): Notifier {
    return target[ObservableSymbol.Notifier];
  }
  export function set(target: any, value: Notifiable): void {
    Reflect.defineMetadata(ObservableSymbol.Notifier, value, target);
  }

  export function get<T extends Record<any, any>>(target: T): T & Notifiable {
    return Reflect.getMetadata(ObservableSymbol.Notifier, target);
  }
  export function canBeNotifiable(value: any): boolean {
    if (!value) {
      return false;
    }
    if (is(value)) {
      return true;
    }
    if (value instanceof Array) {
      return true;
    }
    if (value instanceof Map) {
      return true;
    }
    if (isPlainObject(value)) {
      return true;
    }
    return false;
  }
  export function transform<T = any>(
    value: T,
  ): [T, undefined] | [T & Notifiable, Notifier] {
    let notifier: Notifier | undefined = undefined;
    if (!Observability.trackable(value)) {
      return [value, undefined];
    }
    if (is(value)) {
      notifier = getNotifier(value);
      return [value, notifier];
    }
    const exsit = get(value);
    if (exsit) {
      return [exsit, getNotifier(exsit)];
    }
    let reactable: any;
    if (value instanceof Array) {
      reactable = transformArray(value);
    }
    if (value instanceof Map) {
      reactable = transformMap(value);
    }
    if (isPlainObject(value)) {
      reactable = transformPlainObject(value);
    }
    if (reactable) {
      set(value, reactable);
      return [reactable, getNotifier(reactable)];
    }
    return [value, undefined];
  }

  export function transformArray<T>(toReactable: T[]): T[] & Notifiable {
    const notifier = Notifier.getOrCreate(toReactable);
    return new Proxy(toReactable, {
      get(self: any, prop: string | symbol): any {
        if (prop === ObservableSymbol.Notifier) {
          return notifier;
        }
        if (prop === ObservableSymbol.Self) {
          return self;
        }
        const result = Reflect.get(self, prop);
        const origin = Observability.getOrigin(result);
        const [v] = Notifiable.transform(origin);
        return v;
      },
      set(self: any, prop: string | symbol, value: any): any {
        const result = Reflect.set(self, prop, value);
        notifier.notify(value);
        return result;
      },
    });
  }

  export function transformPlainObject<T extends object>(
    toReactable: T,
  ): T & Notifiable {
    const notifier = Notifier.getOrCreate(toReactable);
    return new Proxy(toReactable, {
      get(self: any, prop: string | symbol): any {
        if (prop === ObservableSymbol.Notifier) {
          return notifier;
        }
        if (prop === ObservableSymbol.Self) {
          return self;
        }
        const result = Reflect.get(self, prop);
        const origin = Observability.getOrigin(result);
        const [v] = Notifiable.transform(origin);
        return v;
      },
      set(self: any, prop: string | symbol, value: any): any {
        const result = Reflect.set(self, prop, value);
        notifier.notify(value);
        return result;
      },
      deleteProperty(self: any, prop: string | symbol): boolean {
        const result = Reflect.deleteProperty(self, prop);
        notifier.notify(undefined);
        return result;
      },
    });
  }

  export function transformMap<T, P>(toReactable: Map<T, P>): Map<T, P> & Notifiable {
    const notifier = Notifier.getOrCreate(toReactable);
    return new Proxy(toReactable, {
      get(self: any, prop: string | symbol): any {
        if (prop === ObservableSymbol.Notifier) {
          return notifier;
        }
        if (prop === ObservableSymbol.Self) {
          return self;
        }
        let result;
        switch (prop) {
          case 'delete':
            return (...args: any) => {
              result = self.delete.apply(self, args);
              notifier.notify(undefined);
              return result;
            };
          case 'clear':
            return (...args: any) => {
              result = (self as Map<any, any>).clear.apply(self, args);
              notifier.notify(undefined);
              return result;
            };
          case 'set':
            return (...args: any) => {
              result = self.set.apply(self, args);
              notifier.notify(undefined);
              return result;
            };
          case 'get':
            return (...args: any) => {
              result = self.get.apply(self, args);
              const origin = Observability.getOrigin(result);
              const [v] = Notifiable.transform(origin);
              return v;
            };
          default:
            result = Reflect.get(self, prop);
            if (typeof result === 'function') {
              return result.bind(self);
            } else {
              const origin = Observability.getOrigin(result);
              const [v] = Notifiable.transform(origin);
              return v;
            }
        }
      },
    });
  }
}

export interface ReactiveHandler {
  onChange?: (value: any) => any;
}
