/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import type { Disposable } from '@difizen/mana-common';

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
    return this.changedEmitter.event;
  }

  dispose() {
    this.changedEmitter.dispose();
    this.disposed = true;
  }

  once(trigger: Notify): Disposable {
    const toDispose = this.onChange((e) => {
      trigger(e.target, e.prop);
      toDispose.dispose();
    });
    return toDispose;
  }

  notify(target: any, prop?: any): void {
    if (ObservableConfig.async) {
      this.changedEmitter.fireAsync({ target, prop });
    } else {
      this.changedEmitter.fire({ target, prop });
    }
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

  static once(
    notifier: Notifier,
    onChange: () => void,
    target: any,
    property?: string,
  ) {
    const toDispose = Observability.getDisposable(notifier, target, property);
    if (toDispose) {
      toDispose.dispose();
    }
    // console.log(notifier);
    const disposable = notifier.onChange(() => {
      onChange();
    });
    Observability.setDisposable(notifier, disposable, target, property);
  }
}
