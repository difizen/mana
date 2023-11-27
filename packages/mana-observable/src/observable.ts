/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notifier } from './notifier';
import { Notifiable } from './reactivity';
import { InstanceValue, ObservableProperties, Observability } from './utils';

//

// redefine observable properties
export function defineProperty(target: any, property: string, defaultValue?: any) {
  /**
   * notify notifier when property changed
   */
  const onChange = () => {
    Notifier.trigger(target, property);
  };
  /**
   * set observable property value and register onChange listener
   * @param value
   * @param notifier
   */
  const setValue = (value: any, notifier: Notifier | undefined) => {
    InstanceValue.set(target, property, value);
    if (notifier) {
      Notifier.once(notifier, onChange, target, property);
    }
  };
  const initialValue = target[property] === undefined ? defaultValue : target[property];
  setValue(...(Notifiable.transform(initialValue) as [any, Notifier | undefined]));
  // property getter
  const getter = function getter(this: any): void {
    const value = Reflect.getMetadata(property, target);
    return value;
  };
  // property setter
  const setter = function setter(this: any, value: any): void {
    const [tValue, notifier] = Notifiable.transform(value);
    const oldValue = InstanceValue.get(target, property);
    if (Notifiable.is(oldValue)) {
      const toDispose = Observability.getDisposable(
        Notifiable.getNotifier(oldValue),
        target,
        property,
      );
      if (toDispose) {
        toDispose.dispose();
      }
    }
    setValue(tValue, notifier);
    if (tValue !== oldValue) {
      onChange();
    }
  };
  // define property
  if (Reflect.deleteProperty(target, property)) {
    Reflect.defineProperty(target, property, {
      configurable: true,
      enumerable: true,
      get: getter,
      set: setter,
    });
  }
  // mark observable property
  ObservableProperties.add(target, property);
  Observability.mark(target, property);
  Observability.mark(target);
}

export function observable<T extends Record<any, any>>(target: T): T {
  if (!Observability.trackable(target)) {
    return target;
  }
  const properties = ObservableProperties.find(target);
  const origin = Observability.getOrigin(target);
  if (!properties) {
    if (Notifiable.canBeNotifiable(target)) {
      const exsit = Notifiable.get(origin);
      if (exsit) {
        return exsit;
      }
      const onChange = () => {
        Notifier.trigger(origin);
      };
      const [notifiableValue, notifier] = Notifiable.transform(origin);
      if (notifier) {
        notifier.onChange(() => {
          onChange();
        });
      }
      Observability.mark(origin);
      return notifiableValue;
    }
    return target;
  }
  properties.forEach((property) => defineProperty(origin, property));
  return origin;
}
