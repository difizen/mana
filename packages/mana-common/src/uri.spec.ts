import assert from 'assert';

import { URI } from './';

describe('URI', () => {
  it('#toSting', async () => {
    assert(new URI('http://a:8080/b/c').toString() === 'http://a:8080/b/c');
    assert(new URI('http://A/B/C').toString() === 'http://a/B/C');
    assert(new URI('http://a.b.c/d/e').toString() === 'http://a.b.c/d/e');
    assert(new URI('http://a@b/c/d').toString() === 'http://a@b/c/d');
    assert(new URI('http://a@b/c@d/e').toString() === 'http://a@b/c%40d/e');
    assert(new URI('http://a@b/c@d/e').toString(true) === 'http://a@b/c@d/e');
    assert(new URI('wss://a@b/c@d/e').toString() === 'wss://a@b/c%40d/e');
  });
});
