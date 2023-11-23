import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import type { CommandRegistry } from '@difizen/mana-app';
import { inject } from '@difizen/mana-app';
import { singleton, CommandContribution } from '@difizen/mana-app';

import { Counter } from './counter';

export const CommonCommand = {
  INCREASE_COUNT: {
    id: 'common.command.increase',
    icon: PlusOutlined,
    label: 'INCREASE',
  },
  DECREACE_COUNT: {
    id: 'common.command.decreace',
    icon: MinusOutlined,
    label: 'DECREACE',
  },

  DECREACE_COUNT_HIDE: {
    id: 'common.command.decreace.hide',
    icon: MinusOutlined,
    label: 'DECREACE-HIDE',
  },
  NOOP: {
    id: 'common.command.NOOP',
    icon: MinusOutlined,
    label: 'NOOP',
  },
};

@singleton({ contrib: CommandContribution })
export class CommonCommandContribution implements CommandContribution {
  @inject(Counter) counter!: Counter;
  registerCommands(command: CommandRegistry): void {
    command.registerCommand(CommonCommand.INCREASE_COUNT, {
      execute: (args: any) => {
        this.counter.count += 1;
      },
    });
    command.registerCommandWithContext(CommonCommand.DECREACE_COUNT, this, {
      execute: () => {
        this.counter.count -= 1;
      },
      isEnabled: (ctx: CommonCommandContribution) => {
        return ctx.counter.count > 0;
      },
    });
    command.registerCommandWithContext(CommonCommand.DECREACE_COUNT_HIDE, this, {
      execute: () => {
        this.counter.count -= 1;
      },
      isVisible: (ctx: CommonCommandContribution) => {
        return ctx.counter.count > 0;
      },
    });

    command.registerCommandWithContext(CommonCommand.NOOP, this, {
      execute: () => {
        //
      },
    });
  }
}
