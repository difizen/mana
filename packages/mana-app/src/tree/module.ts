import { TreeSelectionServiceImpl } from './tree-selection-impl';
import { TreeExpansionServiceImpl } from './tree-expansion';
import { TreeNavigationService } from './tree-navigation';
import { NoopTreeDecoratorService } from './tree-decorator';
import { DefaultTreeProps, TreeNodeComponents } from './tree';
import { DefaultTreeNodeComponents } from './components';
import { TreeProps } from './tree-protocol';
import { ManaModule } from '@difizen/mana-core';
import { TreeLabelProvider } from './tree-label-provider';
import { TreeView } from './view';

export const TreeModule = ManaModule.create().register(
  TreeView,
  TreeLabelProvider,
  TreeSelectionServiceImpl,
  TreeExpansionServiceImpl,
  TreeNavigationService,
  NoopTreeDecoratorService,
  {
    token: TreeProps,
    useValue: DefaultTreeProps,
  },
  {
    token: TreeNodeComponents,
    useValue: DefaultTreeNodeComponents,
  },
);
