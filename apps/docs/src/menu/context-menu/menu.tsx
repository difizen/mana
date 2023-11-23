/* eslint-disable max-len, @typescript-eslint/indent */

import type { MenuRegistry } from '@difizen/mana-app';
import { singleton } from '@difizen/mana-app';
import { MAIN_MENU_BAR } from '@difizen/mana-app';
import { MenuContribution } from '@difizen/mana-app';

import { CommonCommand } from './commands';

export namespace CommonMenus {
  export const MENU = [...MAIN_MENU_BAR, '0_menu'];
  export const MENUS = [...MAIN_MENU_BAR, '5_menus'];
  export const ACTION_GROUP = [...MENUS, '1_action_group'];
  export const SUB = [...ACTION_GROUP, '3_submenu'];
}

@singleton({ contrib: [MenuContribution] })
export class SimpleMenu implements MenuContribution {
  registerMenus(menu: MenuRegistry) {
    menu.registerGroupMenu(CommonMenus.ACTION_GROUP, {});
    menu.registerSubmenu(CommonMenus.SUB, { label: '子菜单' });
    menu.registerSubmenu(CommonMenus.MENU, { label: '菜单项' });
    menu.registerSubmenu(CommonMenus.MENUS, { label: '另一个菜单项' });

    menu.registerMenuAction(CommonMenus.MENUS, {
      id: '1_actions_0',
      command: CommonCommand.DECREACE_COUNT.id,
      label: '操作0',
    });
    menu.registerMenuAction(CommonMenus.MENUS, {
      id: '1_actions_',
      command: CommonCommand.INCREASE_COUNT.id,
      label: '操作1',
    });
    menu.registerMenuAction(CommonMenus.SUB, {
      id: CommonCommand.INCREASE_COUNT.id + 'sub',
      command: CommonCommand.INCREASE_COUNT.id,
    });
    menu.registerMenuAction(CommonMenus.SUB, {
      id: CommonCommand.DECREACE_COUNT.id + 'sub',
      command: CommonCommand.DECREACE_COUNT.id,
    });
    menu.registerMenuAction(CommonMenus.ACTION_GROUP, {
      id: CommonCommand.INCREASE_COUNT.id + 'action',
      command: CommonCommand.INCREASE_COUNT.id,
    });
    menu.registerMenuAction(CommonMenus.ACTION_GROUP, {
      id: CommonCommand.DECREACE_COUNT.id + 'action',
      command: CommonCommand.DECREACE_COUNT.id,
    });
  }
}
