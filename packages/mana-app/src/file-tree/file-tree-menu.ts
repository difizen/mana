import type { CommandRegistry, MenuRegistry } from '@difizen/mana-core';
import { CommandContribution, MenuContribution } from '@difizen/mana-core';
import { singleton } from '@difizen/mana-syringe';
import { PlusOutlined } from '@ant-design/icons';
import { FileTreeContextMenuPath } from './file-tree-protocol';

export const FileTreeCommand = {
  REMOVE: {
    id: 'fileTree.command.remove',
    icon: PlusOutlined,
    label: '删除',
  },
};

@singleton({ contrib: [CommandContribution, MenuContribution] })
export class FileTreeMenuContribution implements CommandContribution, MenuContribution {
  registerCommands(command: CommandRegistry): void {
    command.registerCommand(FileTreeCommand.REMOVE);
  }
  registerMenus(menu: MenuRegistry) {
    menu.registerMenuAction(FileTreeContextMenuPath, {
      id: 'fileTree.remove',
      command: FileTreeCommand.REMOVE.id,
    });
  }
}
