import 'react';
import assert from 'assert';

import { AntdColorContribution } from './antd-color-contribution';
import { ColorRegistry } from './color-registry';

describe('theme color', () => {
  it('#antd color', () => {
    const ctrb = new AntdColorContribution();
    const registry = new ColorRegistry();
    ctrb.registerColors(registry);
    const ids = [...registry.getDefinitionIds()];
    const filtered = ids.filter((item) => item.startsWith('ant'));
    assert(filtered.length > 100);
  });
});
