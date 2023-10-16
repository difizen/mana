import { ManaModule } from '@difizen/mana-core';

import { DefaultTreeNodeComponents, TreeModule, TreeNodeComponents } from '../tree';

import { FileService } from './file-service';
import { TreeNodeIcon } from './file-tree-icon';
import { FileTreeLabelProvider } from './file-tree-label-provider';
import { FileTreeMenuContribution } from './file-tree-menu';
import { FileTreeView } from './file-tree-view';

export const FileTreeModule = ManaModule.create()
  .register(FileTreeView, FileTreeMenuContribution)
  .register(FileService, FileTreeLabelProvider)
  .register({
    token: TreeNodeComponents,
    useValue: { ...DefaultTreeNodeComponents, TreeNodeIcon },
  })
  .dependOn(TreeModule);
