import assert from 'assert';

import renderer, { act } from 'react-test-renderer';

import { ObservableConfig } from './config';
import { prop } from './decorator';
import { useObserve } from './hooks';
import { Notifier } from './notifier';
import { observable } from './observable';

describe('Async', () => {
  beforeAll(() => {
    ObservableConfig.async = true;
  });
  afterAll(() => {
    ObservableConfig.async = false;
  });

  it('#async trigger', (done) => {
    class Foo {
      @prop() name?: string;
    }
    const foo = observable(new Foo());
    let changed = 0;
    const notifier = Notifier.find(foo, 'name');
    notifier?.onChange(() => {
      changed += 1;
    });
    Notifier.trigger(foo, 'name');
    Notifier.trigger(foo, 'name');
    Notifier.trigger(foo, 'name');
    Promise.resolve()
      .then(() => {
        assert(changed === 1);
        done();
        return;
      })
      .catch((_e) => {
        //
      });
  });

  it('#async trigger array', (done) => {
    class Foo {
      @prop() arr: number[] = [1, 2, 3];
    }
    const foo = observable(new Foo());
    let times = 0;
    const notifier = Notifier.find(foo, 'arr');
    notifier?.onChange(() => {
      times += 1;
    });
    foo.arr.push(1);
    foo.arr.splice(1, 1);
    Promise.resolve()
      .then(() => {
        assert(times === 1);
        done();
        return;
      })
      .catch((_e) => {
        //
      });
  });
  it('#async useObserve array', (done) => {
    class Foo {
      @prop() list: number[] = [1, 2, 3];
    }
    const foo = new Foo();
    let renderTimes = 0;
    const FooRender = () => {
      const f = useObserve(foo);
      renderTimes += 1;
      return <div>{f.list.length}</div>;
    };
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <>
          <FooRender />
        </>,
      );
      const json = component.toJSON();
      assert(json === null);
    });
    // eslint-disable-next-line promise/catch-or-return
    act(() => {
      foo.list.push(1);
      foo.list.splice(1, 1);
    }).then(
      (e) => {
        assert(renderTimes === 2);
        done();
        return e;
      },
      (e) => {
        console.error(e);
        return e;
      },
    );
  });
});
