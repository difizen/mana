/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'assert';

import { isPlainObject } from '@difizen/mana-common';

import { Notifiable } from './reactivity';
import { Observability } from './utils';

describe('reactivity', () => {
  it('#can be reactable', () => {
    class Foo {}
    const a = new Foo();
    assert(!Notifiable.canBeNotifiable(a));
    assert(!Notifiable.canBeNotifiable(null));
    assert(!Notifiable.canBeNotifiable(undefined));
    assert(Notifiable.canBeNotifiable([]));
    assert(Notifiable.canBeNotifiable({}));
    assert(Notifiable.canBeNotifiable(new Map()));
    const [arrValue] = Notifiable.transform([]);
    assert(Notifiable.canBeNotifiable(arrValue));
  });
  it('#transform base', () => {
    const [tValue, notifier] = Notifiable.transform(undefined);
    assert(tValue === undefined);
    assert(notifier === undefined);
    const arr = ['a'];
    const [arrValue, arrNotifier] = Notifiable.transform(arr);
    const [arrValue1, arrNotifier1] = Notifiable.transform(arr);
    assert(arrNotifier);
    assert(arrValue !== arr);
    assert(arrValue1 === arrValue);
    assert(arrNotifier1 === arrNotifier);
    const [arrValue2, arrNotifier2] = Notifiable.transform(arrValue);
    assert(arrNotifier === arrNotifier2);
    assert(arrValue === arrValue2);
    class A {}
    const a = new A();
    const [objValue, objNotifier] = Notifiable.transform(a);
    assert(!objNotifier);
    assert(a === objValue);
  });

  it('#transform array', () => {
    const v: any[] = [];
    const [tValue] = Notifiable.transform(v);
    assert(tValue instanceof Array);
    assert(Notifiable.is(tValue));
    assert(Observability.getOrigin(tValue) === v);
  });
  it('#transform array nested', () => {
    const v: any[] = [[]];
    const [tValue] = Notifiable.transform(v);
    assert(tValue[0] instanceof Array);
    assert(Notifiable.is(tValue[0]));
  });

  it('#transform map', () => {
    const v: Map<string, string> = new Map();
    const [tValue] = Notifiable.transform(v);
    assert(tValue instanceof Map);
    assert(Notifiable.is(tValue));
    assert(Observability.getOrigin(tValue) === v);
  });
  it('#transform map nested', () => {
    const v: Map<string, any> = new Map();
    v.set('a', {});
    const [tValue] = Notifiable.transform(v);
    assert(tValue instanceof Map);
    assert(Notifiable.is(tValue.get('a')));
  });

  it('#transform plain object', () => {
    const v = {};
    const [tValue] = Notifiable.transform(v);
    assert(isPlainObject(tValue));
    assert(Notifiable.is(tValue));
    assert(Observability.getOrigin(tValue) === v);
  });
  it('#transform plain object nested', () => {
    const v = { a: {} };
    const [tValue] = Notifiable.transform(v);
    assert(isPlainObject(tValue.a));
    assert(Notifiable.is(tValue.a));
  });

  it('#array notifier', () => {
    const v: any[] = [];
    const [tValue, notifier] = Notifiable.transform(v);
    let changedTimes = 0;
    if (notifier) {
      notifier.onChange(() => {
        changedTimes += 1;
      });
    }
    // Pushing brings changes, one is the set value and the other is the set length
    tValue.push('a');
    tValue.pop();
    assert(tValue.length === 0);
    assert(changedTimes === 3);
  });
  it('#map notifier', () => {
    const v: Map<string, string> = new Map();
    const [tValue, notifier] = Notifiable.transform(v);
    let changedTimes = 0;
    if (notifier) {
      notifier.onChange(() => {
        changedTimes += 1;
      });
    }
    tValue.set('a', 'a');
    const aValue = tValue.get('a');
    assert(aValue === 'a');
    assert(tValue.size === 1);
    tValue.set('b', 'b');
    tValue.delete('a');
    tValue.clear();
    assert(changedTimes === 4);
  });

  it('#plainObject notifier', () => {
    const v: any = { a: '', b: { c: '' }, d: '' };
    const [tValue, notifier] = Notifiable.transform(v);
    const [, notifier1] = Notifiable.transform(v.b);
    let changedTimes = 0;
    if (notifier) {
      notifier.onChange(() => {
        changedTimes += 1;
      });
    }
    if (notifier1) {
      notifier1.onChange(() => {
        changedTimes += 1;
      });
    }
    tValue.a = 'a';
    assert(tValue.a === 'a');
    tValue.b.c = 'c';
    assert(tValue.b.c === 'c');
    delete tValue.d;
    assert(changedTimes === 3);
  });
});
