/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Disposable } from '@difizen/mana-common';

import type { EventListenerOption } from './async-event';
import { AsyncEmitter } from './async-event';
import { ObservableConfig } from './config';
import type { Notify } from './core';
import { ObservableSymbol } from './core';
import { Notifiable } from './notifiable';
import { Observability } from './utils';

export interface Notification<T = any> {
  target: T;
  prop?: any;
}
export class Notifier implements Disposable {
  protected changedEmitter = new AsyncEmitter<Notification>();
  disposed = false;
  get onChange() {
    return (listener: (e: any) => any, options: EventListenerOption = {}) => {
      return this.changedEmitter.event(listener, {
        async: ObservableConfig.async,
        ...options,
      });
    };
  }

  dispose() {
    this.changedEmitter.dispose();
    this.disposed = true;
  }

  once(trigger: Notify, options?: EventListenerOption): Disposable {
    const toDispose = this.onChange((e) => {
      trigger(e.target, e.prop);
      toDispose.dispose();
    }, options);
    return toDispose;
  }

  notify(target: any, prop?: any): void {
    this.changedEmitter.fire({ target, prop });
    if (prop) {
      Notifier.trigger(target);
    }
  }

  static trigger(target: any, prop?: any): void {
    const exist = Notifier.get(target, prop);
    if (exist) {
      exist.notify(target, prop);
    }
  }
  static getOrCreate(target: any, prop?: any): Notifier {
    const notifier = Notifiable.getNotifier(target);
    if (notifier) {
      return notifier;
    }
    const origin = Observability.getOrigin(target);
    const exist = Notifier.get(target, prop);
    if (exist && !exist.disposed) {
      return exist;
    }
    const ntf = new Notifier();
    Notifier.set(origin, ntf, prop);
    return ntf;
  }
  static find(target: any, prop?: any): Notifier | undefined {
    if (!Observability.marked(target, prop)) {
      return undefined;
    }
    return Notifier.getOrCreate(target, prop);
  }
  static get(target: any, property?: any): Notifier | undefined {
    if (property === undefined) {
      return Reflect.getMetadata(ObservableSymbol.Notifier, target);
    } else {
      return Reflect.getMetadata(ObservableSymbol.Notifier, target, property);
    }
  }

  static set(target: any, notifier: Notifier, property?: any): void {
    if (property === undefined) {
      Reflect.defineMetadata(ObservableSymbol.Notifier, notifier, target);
    } else {
      Reflect.defineMetadata(ObservableSymbol.Notifier, notifier, target, property);
    }
  }

  static once(notifier: Notifier, key: any, onChange: () => void) {
    const toDispose = Observability.getDisposable(key, notifier);
    if (toDispose) {
      toDispose.dispose();
    }
    const disposable = notifier.once(() => {
      onChange();
    });
    Observability.setDisposable(key, disposable, notifier);
  }
}
