/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MaybePromise } from '@difizen/mana-common';
import type { interfaces } from 'inversify';
import { ContainerModule } from 'inversify';

import { contributionInjectOption } from '../contribution/contribution-register';
import type { Syringe } from '../core';
import { Utils } from '../core';
import type { InversifyRegister } from '../inversify-api';
import { Register } from '../register';

type TokenOrOption<T> = Syringe.Token<T> | Syringe.InjectOption<T>;

export class SyringeModule implements Syringe.Module {
  protected dependencies: MaybePromise<SyringeModule>[] = [];
  /**
   * @readonly
   * module unique id
   */
  readonly id: number;
  protected moduleName?: string | undefined;
  readonly inversifyModule: ContainerModule;

  protected optionCollection?: (Syringe.Token<any> | Syringe.InjectOption<any>)[];

  get name() {
    return this.moduleName;
  }
  constructor(name?: string) {
    this.moduleName = name;
    this.inversifyModule = new ContainerModule(this.inversifyRegister);
    this.id = this.inversifyModule.id;
  }
  protected inversifyRegister = (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    const inversifyRegister: InversifyRegister = {
      bind,
      unbind,
      isBound,
      rebind,
    };
    const register = <T = any>(
      token: Syringe.Token<T> | Syringe.InjectOption<T>,
      options: Syringe.InjectOption<T> = {},
    ): void => {
      if (Utils.isInjectOption(token)) {
        Register.resolveOption(inversifyRegister, token);
      } else {
        Register.resolveTarget(inversifyRegister, token, options);
      }
    };
    if (this.optionCollection) {
      this.optionCollection.forEach((option) => register(option));
    }
  };

  protected get options() {
    if (!this.optionCollection) {
      this.optionCollection = [];
    }
    return this.optionCollection;
  }
  register(...options: TokenOrOption<any>[]) {
    options.forEach((option) => this.options.push(option));
    return this;
  }

  contribution(...tokens: Syringe.DefinedToken[]) {
    tokens.forEach((token) => this.options.push(contributionInjectOption(token)));
    return this;
  }

  dependOn(...modules: MaybePromise<SyringeModule>[]) {
    this.dependencies.push(...modules);
    return this;
  }

  toLoader(): SyringeModuleLoader {
    return {
      dependencies: this.dependencies.length > 0 ? this.dependencies : undefined,
    };
  }
}

export interface SyringeModuleLoader {
  dependencies?: MaybePromise<SyringeModule>[];
}

export function isSyringeModule(data: Syringe.Module): data is SyringeModule {
  return data && 'inversifyModule' in data;
}
