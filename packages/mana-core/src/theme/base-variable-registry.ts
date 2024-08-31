import { DisposableCollection, Disposable, Emitter } from '@difizen/mana-common';
import { singleton, inject } from '@difizen/mana-syringe';

import { DefaultVariablePrefix } from './protocol';
import type { CssVariable, VariableDefinition } from './protocol';
import { ThemeService } from './theme-service';

/**
 * It should be implemented by an extension, e.g. by the monaco extension.
 */
@singleton()
export class BaseVariableRegistry {
  @inject(ThemeService)
  protected readonly themeService: ThemeService;
  protected get definitionList(): VariableDefinition[] {
    return [...this.definitionMap.values()];
  }
  protected definitionMap: Map<string, VariableDefinition> = new Map();

  protected readonly onDidChangeEmitter = new Emitter<void>();

  readonly onDidChange = this.onDidChangeEmitter.event;

  protected fireDidChange(): void {
    this.onDidChangeEmitter.fire(undefined);
  }

  /**
   * @deprecated using getDefinitionIds instead
   *
   */
  getVariables(): IterableIterator<string> {
    return this.getDefinitionIds();
  }

  getDefinitionIds(): IterableIterator<string> {
    return this.definitionMap.keys();
  }

  getCurrentCssVariables(): CssVariable[] {
    const cssVars: CssVariable[] = [];
    for (const id of this.getDefinitionIds()) {
      const variable = this.toCurrentCssVariable(id);
      if (variable) {
        cssVars.push(variable);
      }
    }
    return cssVars;
  }

  toCurrentCssVariable(id: string): CssVariable | undefined {
    const value = this.getCurrentDefinitionValue(id);
    if (!value) {
      return undefined;
    }
    const name = this.toCssVariableName(id);
    return { name, value };
  }

  toCssVariableName(id: string, prefix?: string): string {
    const def = this.definitionMap.get(id);
    let currentPrefix = prefix;
    if (!currentPrefix) {
      currentPrefix = def?.prefix || DefaultVariablePrefix;
    }
    if (currentPrefix) {
      return `--${currentPrefix}-${id.replace(/\./g, '-')}`;
    }
    return `--${id.replace(/\./g, '-')}`;
  }

  getCurrentDefinitionValue(id: string): string | undefined {
    const theme = this.themeService.getActiveTheme();
    const { type, extraTokens } = theme;
    if (extraTokens && extraTokens.basic && extraTokens.basic[id]) {
      return extraTokens.basic[id];
    }
    const definition = this.definitionMap.get(id);
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
    this.definitionMap.set(definition.id, {
      id: definition.id,
      prefix: definition.prefix,
      defaults: definition.defaults,
      description: definition.description,
    });
    return Disposable.create(() => {
      this.definitionMap.delete(definition.id);
    });
  }
}
