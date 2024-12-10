import { MAIN_MENU_BAR } from '@difizen/mana-app';
import * as React from 'react';
import { forwardRef } from 'react';

import { MenuRender } from '../workbench/menu/render.js';

export const ManaMenubarComponent = forwardRef(function ManaMenubarComponent(
  props,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref}>
      <MenuRender path={MAIN_MENU_BAR} />
    </div>
  );
});

export default ManaMenubarComponent;
