import { ConfigurationService } from '../configuration/common/configurationService';
import { BrowserKeyboardLayoutProvider, KeyboardLayoutService } from '../keyboard';
import { ManaModule } from '../module';

import { ContextKeyService } from './context-key-service';
import { KeybindingContext, KeybindingRegistry } from './keybinding';
import { KeybindingContribution } from './keybinding-proocol';
import { VSContextKeyService } from './vs/contextkey/contextKeyService';

export const KeybindModule = ManaModule.create()
  .contribution(KeybindingContribution, KeybindingContext)
  .register(
    VSContextKeyService,
    ContextKeyService,
    KeybindingRegistry,

    // keyboard
    BrowserKeyboardLayoutProvider,
    KeyboardLayoutService,

    // configuration
    ConfigurationService,
  );

export { KeybindingContribution } from './keybinding-proocol';
export { KeybindingRegistry } from './keybinding';
export { ContextKeyService } from './context-key-service';
export * from './vs/contextkey';
