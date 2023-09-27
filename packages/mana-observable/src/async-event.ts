/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { noop } from '@difizen/mana-common';
import type { Disposable } from '@difizen/mana-common';

let called: Function[] | undefined = undefined;

/**
 * Represents a typed event.
 */
export type Event<T> = {
  /**
   *
   * @param listener The listener function will be call when the event happens.
   * @param context The 'this' which will be used when calling the event listener.
   * @return a disposable to remove the listener again.
   */
  (listener: (e: T) => any, context?: any): Disposable;
};

type Callback = (...args: any[]) => any;
class CallbackList implements Iterable<Callback> {
  protected mono = false;

  constructor(mono = false) {
    this.mono = mono;
  }
  private _callbacks: [Function, any][] | undefined;

  get length(): number {
    return (this._callbacks && this._callbacks.length) || 0;
  }

  public add(callback: Function, context: any = undefined): void {
    if (!this._callbacks) {
      this._callbacks = [];
    }
    this._callbacks.push([callback, context]);
  }

  public remove(callback: Function, context: any = undefined): void {
    if (!this._callbacks) {
      return;
    }

    let foundCallbackWithDifferentContext = false;
    for (let i = 0; i < this._callbacks.length; i += 1) {
      if (this._callbacks[i][0] === callback) {
        if (this._callbacks[i][1] === context) {
          // remove when callback & context match
          this._callbacks.splice(i, 1);
          return;
        }
        foundCallbackWithDifferentContext = true;
      }
    }

    if (foundCallbackWithDifferentContext) {
      throw new Error('You should remove it with the same context you add it');
    }
  }

  // tslint:disable-next-line:typedef
  public [Symbol.iterator]() {
    if (!this._callbacks) {
      return [][Symbol.iterator]();
    }
    const callbacks = this._callbacks.slice(0);

    return callbacks
      .map(
        (callback) =>
          (...args: any[]) =>
            callback[0].apply(callback[1], args),
      )
      [Symbol.iterator]();
  }

  public invoke(...args: any[]): any[] {
    const ret: any[] = [];
    for (const callback of this) {
      try {
        ret.push(callback(...args));
      } catch (e) {
        console.error(e);
      }
    }
    return ret;
  }

  public invokeAsync(...args: any[]): any[] {
    const ret: any[] = [];
    if (!this._callbacks) {
      return [];
    }
    if (!called) {
      called = [];
    }
    const callbacks = this._callbacks?.slice(0);
    for (const [callback, ctx] of callbacks) {
      try {
        let promise;
        if (!called.includes(callback)) {
          called.push(callback);
          promise = Promise.resolve().then(() => {
            callback.apply(ctx, args);
            called = undefined;
            return;
          });
        }
        ret.push(promise);
      } catch (e) {
        console.error(e);
      }
    }
    return ret;
  }

  public isEmpty(): boolean {
    return !this._callbacks || this._callbacks.length === 0;
  }

  public dispose(): void {
    this._callbacks = undefined;
  }
}

export type EmitterOptions = {
  onFirstListenerAdd?: Function;
  onLastListenerRemove?: Function;
};

export class AsyncEmitter<T = any> {
  private _event?: Event<T>;
  protected _callbacks: CallbackList | undefined;
  private _disposed = false;
  private _options?: EmitterOptions | undefined;

  constructor(_options?: EmitterOptions) {
    this._options = _options;
  }

  /**
   * For the public to allow to subscribe
   * to events from this Emitter
   */
  get event(): Event<T> {
    if (!this._event) {
      this._event = (
        listener: (e: T) => any,
        thisArgs?: any,
        disposables?: Disposable[],
      ) => {
        if (!this._callbacks) {
          this._callbacks = new CallbackList();
        }
        if (
          this._options &&
          this._options.onFirstListenerAdd &&
          this._callbacks.isEmpty()
        ) {
          this._options.onFirstListenerAdd(this);
        }
        this._callbacks.add(listener, thisArgs);

        const result: Disposable = {
          dispose: () => {
            result.dispose = noop;
            if (!this._disposed) {
              this._callbacks!.remove(listener, thisArgs);
              result.dispose = noop;
              if (
                this._options &&
                this._options.onLastListenerRemove &&
                this._callbacks!.isEmpty()
              ) {
                this._options.onLastListenerRemove(this);
              }
            }
          },
        };
        if (Array.isArray(disposables)) {
          disposables.push(result);
        }

        return result;
      };
    }
    return this._event;
  }

  /**
   * To be kept private to fire an event to
   * subscribers
   */
  fire(event: T): any {
    if (this._callbacks) {
      this._callbacks.invoke(event);
    }
  }

  /**
   * To be kept private to fire an event to
   * subscribers
   */
  fireAsync(event: T): any {
    if (this._callbacks) {
      this._callbacks.invokeAsync(event);
    }
  }

  dispose(): void {
    if (this._callbacks) {
      this._callbacks.dispose();
      this._callbacks = undefined;
    }
    this._disposed = true;
  }
}
