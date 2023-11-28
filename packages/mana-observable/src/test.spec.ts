// import 'react';
import assert from 'assert';

import { prop } from './decorator';
// import { Trackable, Tracker } from './tracker';
import { Tracker } from './tracker';
// import { Observability } from './utils';

describe('test', () => {
  it('#track observable array property', () => {
    class Bar {
      @prop() count = 0;
    }
    class Foo {
      @prop() arr: Bar[] = [];
    }
    const foo = new Foo();
    let changeCount = 0;
    const reaction = () => {
      const trackable = Tracker.track(foo, reaction);
      trackable.arr;
      changeCount += 1;
    };
    reaction(); // 1
    foo.arr.push(new Bar()); // 2
    foo.arr.push(new Bar());
    foo.arr.push(new Bar());
    // console.log(changeCount);
    assert(changeCount === 7);
  });
});
