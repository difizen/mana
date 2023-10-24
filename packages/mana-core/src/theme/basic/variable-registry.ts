import { DisposableCollection, Disposable, Emitter } from '@difizen/mana-common';
import { singleton, inject } from '@difizen/mana-syringe';

import { ThemeService } from '../theme-service';

export interface VariableDefinition {
  id: string;
  defaults?:
    | {
        light?: string;
        dark?: string;
        hc?: string;
        [key: string]: string | undefined;
      }
    | undefined;
  description: string;
}

export type CssVariable = {
  name: string;
  value: string;
};

/**
 * It should be implemented by an extension, e.g. by the monaco extension.
 */
@singleton()
export class VariableRegistry {
  private definitionList: VariableDefinition[] = [];

  protected readonly onDidChangeEmitter = new Emitter<void>();

  readonly onDidChange = this.onDidChangeEmitter.event;

  protected readonly themeService: ThemeService;

  constructor(
    @inject(ThemeService)
    themeService: ThemeService,
  ) {
    this.themeService = themeService;
  }

  protected fireDidChange(): void {
    this.onDidChangeEmitter.fire(undefined);
  }

  *getVariables(): IterableIterator<string> {
    // eslint-disable-next-line no-restricted-syntax
    for (const definition of this.definitionList) {
      yield definition.id;
    }
  }

  getCurrentCssVariable(id: string): CssVariable | undefined {
    const value = this.getCurrentVariable(id);
    if (!value) {
      return undefined;
    }
    const name = this.toCssVariableName(id);
    return { name, value };
  }

  toCssVariableName(id: string, prefix = 'mana'): string {
    return `--${prefix}-${id.replace(/\./g, '-')}`;
  }

  getCurrentVariable(id: string): string | undefined {
    const theme = this.themeService.getActiveTheme();
    const { type, extraTokens } = theme;
    if (extraTokens && extraTokens.basic && extraTokens.basic[id]) {
      return extraTokens.basic[id];
    }
    const definition = this.definitionList.find((definition) => definition.id === id);
    if (definition && definition.defaults && definition.defaults[type]) {
      return definition.defaults[type];
    }
    return undefined;
  }

  register(...definitions: VariableDefinition[]): Disposable {
    const result = new DisposableCollection(
      ...definitions.map((definition) => this.doRegister(definition)),
    );
    this.fireDidChange();
    return result;
  }

  protected doRegister(definition: VariableDefinition): Disposable {
    this.definitionList.push({
      id: definition.id,
      defaults: definition.defaults,
      description: definition.description,
    });
    return Disposable.NONE;
  }
}
