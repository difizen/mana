import { ManaModule } from '@difizen/mana-app';

import { SettingEditorModule } from './configuration';

export * from './configuration';

export const ManaPreset = ManaModule.create().dependOn(SettingEditorModule);
