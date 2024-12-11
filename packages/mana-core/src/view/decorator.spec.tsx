import 'react';
import assert from 'assert';
import 'reflect-metadata';

import { view } from './decorator';
import { BaseView } from './default-view';
import { ViewComponentToken, ViewDefineToken } from './view-protocol';

describe('app', () => {
  it('#view factory', () => {
    @view('foo')
    class Foo extends BaseView {}
    assert(Reflect.getMetadata(ViewDefineToken, Foo) === 'foo');
  });
  it('#view meta', () => {
    const FooRender = () => <></>;
    @view({ id: 'foo', component: FooRender })
    class Foo extends BaseView {}
    assert(Reflect.getMetadata(ViewDefineToken, Foo) === 'foo');
    assert(Reflect.getMetadata(ViewComponentToken, Foo) === FooRender);
  });
});
