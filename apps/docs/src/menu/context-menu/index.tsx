import {
  ManaModule,
  ManaAppPreset,
  useInject,
  ManaComponents,
  MAIN_MENU_BAR,
  MenuRender,
} from '@difizen/mana-app';
import { Dropdown } from '@difizen/mana-react';

import { CommonCommandContribution } from './commands';
import { Counter } from './counter';
import { SimpleMenu } from './menu';

export * from './counter';
export * from './commands';

export const BaseModule = ManaModule.create().register(
  SimpleMenu,
  CommonCommandContribution,
  Counter,
);

const MyMenu = () => {
  const counter = useInject(Counter);
  return (
    <MenuRender data={[{ a: 'a' }, { b: 'b' }, counter]} menuPath={MAIN_MENU_BAR} />
  );
};

const App = (): JSX.Element => {
  return (
    <ManaComponents.Application
      asChild={true}
      modules={[ManaAppPreset, BaseModule]}
      renderChildren
    >
      <Dropdown trigger={['contextMenu']} overlay={<MyMenu />}>
        <div
          role="button"
          style={{
            border: '1px solid #000',
            padding: '100px 0',
            textAlign: 'center',
          }}
        >
          Right click me!
        </div>
      </Dropdown>
    </ManaComponents.Application>
  );
};

export default App;
