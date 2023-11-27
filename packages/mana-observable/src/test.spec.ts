// import 'react';
import assert from 'assert';

// import { prop } from './decorator';
import { Notifiable } from './notifiable';
import { Notifier } from './notifier';
import { observable } from './observable';
import { Observability } from './utils';

describe('observable', () => {
  it('#observable reactbale', () => {
    const v: any[] = [];
    class Foo {}
    const foo = new Foo();
    const reactable = observable(v);
    const reactable1 = observable(v);
    const reactable2 = observable(reactable);
    assert(reactable1 === reactable2);
    assert(reactable === reactable1);
    const observableFoo = observable(foo);
    assert(Notifiable.is(reactable));
    assert(Observability.marked(v));
    assert(observableFoo === foo);
    let changed = false;
    const notifier = Notifier.find(reactable);
    notifier?.onChange(() => {
      changed = true;
    });
    reactable1.push('');
    assert(changed);
  });
});
