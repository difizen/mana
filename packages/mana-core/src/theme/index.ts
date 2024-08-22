import { ManaModule } from '../module';

import { DefaultVariableRegistry } from './basic/default-variable-registry';
import { VariableApplication } from './basic/variable-application';
import { VariableContribution } from './basic/variable-protocol';
import { VariableRegistry } from './basic/variable-registry';
import { AntdColorRegistry } from './color/antd-color-registry';
import { ColorApplication } from './color/color-application';
import { ColorContribution } from './color/color-protocol';
import { ColorRegistry } from './color/color-registry';
import { DefaultColorRegistry } from './color/default-color-registry';
import { ThemeService } from './theme-service';

export * from './basic';
export * from './color';
export * from './theme-service';

export const ThemeModule = ManaModule.create().register({
  token: ThemeService,
  useDynamic: () => {
    return ThemeService.get();
  },
});

export const ThemeVariableModule = ManaModule.create()
  .contribution(VariableContribution, ColorContribution)
  .register(
    VariableRegistry,
    VariableApplication,
    DefaultVariableRegistry,
    AntdColorRegistry,
  )
  .register(ColorRegistry, ColorApplication, DefaultColorRegistry)
  .dependOn(ThemeModule);
