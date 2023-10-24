import { Disposable, DisposableCollection } from '@difizen/mana-common';
import type { Contribution } from '@difizen/mana-syringe';
import { contrib, inject, singleton } from '@difizen/mana-syringe';

import type { Application } from '../../application';
import { ApplicationContribution } from '../../application';
import { ThemeService } from '../theme-service';

import { VariableContribution } from './variable-protocol';
import { VariableRegistry } from './variable-registry';

@singleton({ contrib: ApplicationContribution })
export class VariableApplication implements ApplicationContribution {
  protected app?: Application;
  protected readonly toUpdate = new DisposableCollection(); // dispose action when update

  protected readonly themeService: ThemeService;
  protected readonly variables: VariableRegistry;
  protected readonly variableContributions: Contribution.Provider<VariableContribution>;

  constructor(
    @inject(ThemeService)
    themeService: ThemeService,
    @inject(VariableRegistry)
    variables: VariableRegistry,
    @contrib(VariableContribution)
    variableContributions: Contribution.Provider<VariableContribution>,
  ) {
    this.themeService = themeService;
    this.variables = variables;
    this.variableContributions = variableContributions;
  }

  onStart(app: Application): void {
    this.app = app;
    for (const contribution of this.variableContributions.getContributions()) {
      contribution.registerVariables(this.variables);
    }
    this.update();
    this.themeService.onDidColorThemeChange(() => this.update());
    this.variables.onDidChange(() => this.update());
  }

  protected update(): void {
    if (!document) {
      return;
    }
    this.toUpdate.dispose();
    const themeClass = `mana-${this.themeService.getCurrentTheme().type}`;
    document.body.classList.add(themeClass);
    this.toUpdate.push(
      Disposable.create(() => document.body.classList.remove(themeClass)),
    );
    const { documentElement } = document;
    if (documentElement) {
      for (const id of this.variables.getVariables()) {
        const variable = this.variables.getCurrentCssVariable(id);
        if (variable) {
          const { name, value } = variable;
          documentElement.style.setProperty(name, value);
          this.toUpdate.push(
            Disposable.create(() => documentElement.style.removeProperty(name)),
          );
        }
      }
    }
  }
}
