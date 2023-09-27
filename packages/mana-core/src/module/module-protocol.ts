import type { MaybePromise } from '@difizen/mana-common';
import type { Syringe } from '@difizen/mana-syringe';

import type { ManaModule } from './mana-module';

export type ModulePreload = (ctx: Syringe.Context) => Promise<void>;
export type CanloadModule = (ctx: ManaModule) => Promise<boolean>;

export interface ModuleLoader {
  canload?: CanloadModule | undefined;
  preload?: ModulePreload | undefined;
  dependencies?: MaybePromise<ManaModule>[] | undefined;
}
