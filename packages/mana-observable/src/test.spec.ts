/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'assert';

import { prop } from './decorator';
import { Trackable, Tracker } from './tracker';
// import { Observability } from './utils';

describe('Tracker', () => {
  it('#track basic', () => {
    class Foo {
      @prop() info = '';
    }
    const foo = new Foo();
    let changeTimes = 0;
    const reaction = () => {
      changeTimes += 1;
    };
    const f = Tracker.track(foo, reaction);
    f.info;
    f.info = 'foo';
    assert(f !== foo);
    assert(Trackable.tryGetOrigin(f) === foo);
    assert(
      Tracker.track(null as any, () => {
        //
      }) === null,
    );
    const empty = {};
    assert(
      Tracker.track(empty, () => {
        //
      }) !== empty,
    );
    const f1 = Tracker.track(f, reaction);
    f1.info;
    f1.info = 'foo1';
    assert(changeTimes === 2);
  });
});
