import { ManaModule } from '@difizen/mana-core';
import { DefaultTreeNodeComponents, TreeModule, TreeNodeComponents } from '../tree';
import { FileTreeLabelProvider } from './file-tree-label-provider';
import { FileTreeView } from './file-tree-view';
import { FileService } from './file-service';
import { TreeNodeIcon } from './file-tree-icon';
import { FileTreeMenuContribution } from './file-tree-menu';

export const FileTreeModule = ManaModule.create()
  .register(FileTreeView, FileTreeMenuContribution)
  .register(FileService, FileTreeLabelProvider)
  .register({
    token: TreeNodeComponents,
    useValue: { ...DefaultTreeNodeComponents, TreeNodeIcon },
  })
  .dependOn(TreeModule);
