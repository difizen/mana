import { Disposable } from '@difizen/mana-common';

import type { Notify } from './core';
import { Notifier } from './notifier';
import { observable } from './observable';
import { getOrigin, Observability } from './utils';

function tryObservable<T>(target: T) {
  const data = getOrigin(target);
  if (!Observability.canBeObservable(data)) {
    return data;
  }
  if (!Observability.marked(data)) {
    return observable(data);
  }
  return data;
}

function watchAll<T>(target: T, callback: Notify): Disposable {
  const data = getOrigin(target);
  if (!Observability.canBeObservable(data)) {
    return Disposable.NONE;
  }
  tryObservable(data);
  const notifier = Notifier.find(data);
  if (!notifier) {
    return Disposable.NONE;
  }
  const props: string[] = Object.keys(data);
  if (props) {
    props.forEach((prop) => Notifier.find(target, prop));
  }
  return notifier.onChange(callback);
}

function watchProp<T>(
  target: T,
  prop: Extract<keyof T, string>,
  callback: Notify,
): Disposable {
  const origin = getOrigin(target);
  tryObservable(origin);
  const notifier = Notifier.find(origin, prop);
  if (notifier) {
    return notifier.onChangeSync(callback);
  }
  console.warn(
    `Cannot add watcher for unobservable property ${prop.toString()}`,
    target,
  );
  return Disposable.NONE;
}

export function watch<T>(target: T, callback: Notify): Disposable;
export function watch<T>(
  target: T,
  prop: Extract<keyof T, string>,
  callback: Notify,
): Disposable;
export function watch<T>(
  target: T,
  prop: Extract<keyof T, string> | Notify,
  callback?: Notify,
): Disposable {
  let cb: Notify;
  if (typeof prop === 'function') {
    cb = prop;
    return watchAll(target, cb);
  }
  if (typeof prop === 'string' && callback) {
    cb = callback;
    return watchProp(target, prop, cb);
  }
  console.warn(`Invalid arguments for watch ${prop.toString()}`, target);
  return Disposable.NONE;
}
