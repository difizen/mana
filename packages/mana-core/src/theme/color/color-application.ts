/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-redeclare */
import { Disposable, DisposableCollection } from '@difizen/mana-common';
import type { Contribution } from '@difizen/mana-syringe';
import { contrib, inject, singleton } from '@difizen/mana-syringe';

import type { Application } from '../../application';
import { ApplicationContribution } from '../../application';
import { ThemeService } from '../theme-service';

import { ColorContribution } from './color-protocol';
import { ColorRegistry } from './color-registry';

@singleton({ contrib: ApplicationContribution })
export class ColorApplication implements ApplicationContribution {
  protected app?: Application;
  protected readonly toUpdate = new DisposableCollection(); // dispose action when update

  protected readonly themeService: ThemeService;
  protected readonly colors: ColorRegistry;
  protected readonly colorContributions: Contribution.Provider<ColorContribution>;

  constructor(
    @inject(ThemeService)
    themeService: ThemeService,
    @inject(ColorRegistry)
    colors: ColorRegistry,
    @contrib(ColorContribution)
    colorContributions: Contribution.Provider<ColorContribution>,
  ) {
    this.themeService = themeService;
    this.colors = colors;
    this.colorContributions = colorContributions;
  }

  onStart(app: Application): void {
    this.app = app;
    for (const contribution of this.colorContributions.getContributions()) {
      contribution.registerColors(this.colors);
    }
    this.update();
    this.themeService.onDidColorThemeChange(() => this.update());
    this.colors.onDidChange(() => this.update());
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
      for (const id of this.colors.getColors()) {
        const variable = this.colors.getCurrentCssVariable(id);
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
