import { noop } from '@difizen/mana-common';
import type { Disposable } from '@difizen/mana-common';

export interface EventListenerOption {
  async?: boolean;
  context?: any;
}

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
  (listener: (e: T) => any, options?: EventListenerOption): Disposable;
};

type Callback = (...args: any[]) => any;

// let called: Callback[] | undefined = undefined;
class CallbackList implements Iterable<Callback> {
  protected _callbacks: [Callback, any][] | undefined;

  get length(): number {
    return (this._callbacks && this._callbacks.length) || 0;
  }

  public add(callback: Callback, context: any = undefined): void {
    if (!this._callbacks) {
      this._callbacks = [];
    }
    this._callbacks.push([callback, context]);
  }

  public remove(callback: Callback, context: any = undefined): void {
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

class AsyncCallbackList extends CallbackList {
  protected called: Callback[] | undefined = undefined;

  public override invoke(...args: any[]): any[] {
    const ret: any[] = [];
    if (!this._callbacks) {
      return [];
    }
    if (!this.called) {
      this.called = [];
    }
    const callbacks = this._callbacks?.slice(0);
    for (const [callback, ctx] of callbacks) {
      try {
        let promise;
        if (!this.called.includes(callback)) {
          this.called.push(callback);
          promise = Promise.resolve().then(() => {
            callback.apply(ctx, args);
            this.called = undefined;
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
}

export type EmitterOptions = {
  onFirstListenerAdd?: (ctx: any) => void;
  onLastListenerRemove?: (ctx: any) => void;
};

export class AsyncEmitter<T = any> {
  protected _event?: Event<T>;
  protected _callbacks: CallbackList | undefined;
  protected _asyncCallbacks: CallbackList | undefined;
  protected _disposed = false;
  protected _options?: EmitterOptions | undefined;

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
        options: EventListenerOption = { async: false },
        disposables?: Disposable[],
      ) => {
        const callbacks = () => {
          if (options.async) {
            if (!this._asyncCallbacks) {
              this._asyncCallbacks = new AsyncCallbackList();
            }
            return this._asyncCallbacks;
          }
          if (!this._callbacks) {
            this._callbacks = new CallbackList();
          }
          return this._callbacks;
        };
        const callbackList = callbacks();
        if (
          this._options &&
          this._options.onFirstListenerAdd &&
          callbackList.isEmpty()
        ) {
          this._options.onFirstListenerAdd(this);
        }
        callbackList.add(listener, options.context);

        const result: Disposable = {
          dispose: () => {
            result.dispose = noop;
            if (!this._disposed) {
              callbacks().remove(listener, options.context);
              result.dispose = noop;
              if (
                this._options &&
                this._options.onLastListenerRemove &&
                callbacks().isEmpty()
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
   * fire an event to subscribers
   */
  fire(event: T): any {
    if (this._callbacks) {
      this._callbacks.invoke(event);
    }
    if (this._asyncCallbacks) {
      this._asyncCallbacks.invoke(event);
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
