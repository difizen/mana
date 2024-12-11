import { MacCommandOutlined } from '@ant-design/icons';
import { BaseView, view } from '@difizen/mana-app';
import { singleton } from '@difizen/mana-app';
import { prop } from '@difizen/mana-app';
import { lazy } from 'react';

export const ManaMenubarComponent = lazy(() => import('./antd-menu-component.js'));

@singleton()
@view({ id: 'AntdMenuView', component: ManaMenubarComponent })
export class AntdMenuView extends BaseView {
  @prop()
  count = 0;
  constructor() {
    super();
    this.title.icon = MacCommandOutlined;
    this.title.label = 'Antd 菜单';
    this.id = 'antd-menu';
  }
}
