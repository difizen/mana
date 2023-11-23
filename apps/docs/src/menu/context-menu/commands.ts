import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import type { CommandRegistry } from '@difizen/mana-app';
import { inject, singleton, CommandContribution } from '@difizen/mana-app';

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
};

@singleton({ contrib: CommandContribution })
export class CommonCommandContribution implements CommandContribution {
  @inject(Counter) counter!: Counter;
  registerCommands(command: CommandRegistry): void {
    command.registerCommand(CommonCommand.INCREASE_COUNT, {
      execute: (a: any, b: any, c: any) => {
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
  }
}
