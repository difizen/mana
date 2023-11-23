import type { MenuItemRenderProps, Menu as ManaMenu } from '@difizen/mana-app';
import { ManaModule, MenuRegistry } from '@difizen/mana-app';
import {
  ManaAppPreset,
  useInject,
  ManaComponents,
  MAIN_MENU_BAR,
  MenuItem,
  MenuInstance,
  MenuRender,
  DisposableCollection,
} from '@difizen/mana-app';
import { Menu, Dropdown } from 'antd';
import type { MenuProps } from 'antd/lib/menu';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useState } from 'react';

import { CommonCommandContribution } from './commands';
import { Counter } from './counter';
import { SimpleMenu, CommonMenus } from './menu';
import './index.less';

export * from './counter';
export * from './commands';

export const BaseModule = ManaModule.create().register(
  SimpleMenu,
  CommonCommandContribution,
  Counter,
);

const MenuItemToProps = (item: MenuItem, menu: ManaMenu): ItemType | undefined => {
  if (MenuItem.isGeneralMenuItem(item)) {
    let children: ItemType[] = [];
    if (item.children) {
      children = item.children
        .map((child) => MenuItemToProps(child, menu))
        .filter((i): i is ItemType => !!i);
    }
    if (children.filter((i) => !!i).length === 0) {
      return undefined;
    }
    if (item.isSubmenu) {
      return {
        key: item.key,
        label: item.renderTitle(),
        icon: item.renderIcon(),
        children,
      };
    } else {
      return {
        key: item.key,
        label: item.renderTitle(),
        type: 'group',
        children,
      };
    }
  }
  if (MenuItem.isActionMenuItem(item)) {
    if (!menu.isVisible(item)) {
      return undefined;
    }
    return {
      key: item.key,
      label: item.renderTitle(),
      icon: item.renderIcon(),
      disabled: !menu.isEnable(item),
      onClick: () => menu.execute(item),
    };
  }
  return undefined;
};

const MenuItemRender = (props: MenuItemRenderProps) => {
  const { item, root } = props;
  const [dynamicMenusToDispose, setDynamicMenusToDispose] = useState<
    DisposableCollection | undefined
  >(undefined);
  const counter = useInject(Counter);
  const menu = useInject<ManaMenu>(MenuInstance);
  const menus = useInject<MenuRegistry>(MenuRegistry);
  if (!root || !MenuItem.isGeneralMenuItem(item)) {
    return null;
  }
  const menuProps: MenuProps['items'] = item.children
    .map((i) => MenuItemToProps(i, menu))
    .filter((i): i is ItemType => !!i);

  return (
    <Dropdown
      onOpenChange={(open: boolean) => {
        if (open && counter.count > 0) {
          if (dynamicMenusToDispose && !dynamicMenusToDispose.disposed) {
            dynamicMenusToDispose.dispose();
          }
          if (counter.count > 0) {
            const toDispose = new DisposableCollection();
            for (let index = 0; index < counter.count; index++) {
              toDispose.push(
                menus.registerMenuAction(CommonMenus.MENU_DYNAMIC, {
                  id: 'dynamic-menu-' + index,
                  label: '动态菜单' + index,
                  execute: () => {
                    //console.log('dynamic-menu-' + index);
                  },
                  isVisible: () => true,
                  isEnabled: () => true,
                }),
              );
            }
            setDynamicMenusToDispose(toDispose);
          }
        } else {
          if (dynamicMenusToDispose) {
            dynamicMenusToDispose.dispose();
          }
          setDynamicMenusToDispose(undefined);
        }
      }}
      menu={{ items: menuProps }}
      trigger={['contextMenu']}
    >
      <div>
        <Menu mode="inline" items={menuProps} />
      </div>
    </Dropdown>
  );
};

const MyMenu = () => {
  const counter = useInject(Counter);
  return (
    <div className="libro-example-menu-antd-context-menu">
      <div>counter: {counter.count}</div>
      <div>
        {/* <MenuBarRender menuPath={MAIN_MENU_BAR} /> */}
        <MenuRender
          data={[{ a: 'a' }]}
          menuPath={MAIN_MENU_BAR}
          render={MenuItemRender}
        />
      </div>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <ManaComponents.Application
      asChild={true}
      modules={[ManaAppPreset, BaseModule]}
      renderChildren
    >
      <MyMenu />
    </ManaComponents.Application>
  );
};

export default App;
