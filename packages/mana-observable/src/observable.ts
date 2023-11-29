/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notifiable } from './notifiable';
import { Notifier } from './notifier';
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
  const handleValue = (value: any) => {
    InstanceValue.set(target, property, value);
    if (Notifiable.is(value)) {
      const notifier = Notifiable.getNotifier(value);
      if (notifier) {
        const last = Observability.getDisposable(notifier, target, property);
        if (last) {
          last.dispose();
        }
        const toDispose = notifier.onChange(onChange, { async: false });
        Observability.setDisposable(notifier, toDispose, target, property);
      }
    }
  };
  const initialValue = target[property] === undefined ? defaultValue : target[property];
  handleValue(Notifiable.transform(initialValue));
  // property getter
  const getter = function getter(this: any): void {
    const value = Reflect.getMetadata(property, target);
    return value;
  };
  // property setter
  const setter = function setter(this: any, value: any): void {
    const notifiableValue = Notifiable.transform(value);
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
    handleValue(notifiableValue);
    if (notifiableValue !== oldValue) {
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
}

export function observable<T extends Record<any, any>>(target: T): T {
  if (!Observability.canBeObservable(target)) {
    return target;
  }
  const origin = Observability.getOrigin(target);
  const properties = ObservableProperties.find(origin);
  if (!properties) {
    const notifiableValue = Notifiable.transform(origin);
    Observability.mark(origin);
    return notifiableValue;
  }
  properties.forEach((property) => defineProperty(origin, property));
  return origin;
}
