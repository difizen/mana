import { Emitter } from '@difizen/mana-common';
import { getOrigin } from '@difizen/mana-observable';
import type { Contribution } from '@difizen/mana-syringe';
import { contrib, inject, singleton } from '@difizen/mana-syringe';

import type { ConfigurationNode } from './configuration-protocol';
import { ConfigurationProvider } from './configuration-provider';
import { ConfigurationRegistry } from './configuration-registry';
import type { ConfigurationStorage } from './configuration-storage';
import { DefaultConfigurationStorage } from './configuration-storage';
import { SchemaValidator } from './validation';

@singleton()
export class ConfigurationService {
  protected providers: Contribution.Provider<ConfigurationProvider>;

  protected readonly configurationRegistry: ConfigurationRegistry;

  protected readonly schemaValidator: SchemaValidator;

  constructor(
    @contrib(ConfigurationProvider)
    providers: Contribution.Provider<ConfigurationProvider>,
    @inject(ConfigurationRegistry)
    configurationRegistry: ConfigurationRegistry,
    @inject(SchemaValidator) schemaValidator: SchemaValidator,
  ) {
    this.providers = providers;
    this.configurationRegistry = configurationRegistry;
    this.schemaValidator = schemaValidator;
  }

  protected readonly onConfigurationValueChangeEmitter = new Emitter<{
    key: string;
    value: any;
  }>();
  readonly onConfigurationValueChange = this.onConfigurationValueChangeEmitter.event;

  async has<T>(node: ConfigurationNode<T>): Promise<boolean> {
    let result = false;
    const scopeArray = this.configurationRegistry.getStorages();
    for (const scope of scopeArray.sort((a, b) => b.priority - a.priority)) {
      const provider = this.getConfigurationProviderByStorage(scope);
      if (!provider) {
        continue;
      }
      const hasValue = await provider.has(node);
      if (hasValue) {
        result = true;
        break;
      }
    }
    return result;
  }

  async get<T>(node: ConfigurationNode<T>, defaultValue?: T): Promise<T> {
    let result: T = defaultValue ?? node.defaultValue;
    const scopeArray = this.configurationRegistry.getStorages();
    for (const scope of scopeArray.sort((a, b) => b.priority - a.priority)) {
      const provider = this.getConfigurationProviderByStorage(scope);
      if (!provider) {
        continue;
      }

      const hasValue = await provider.has(node);

      if (!hasValue) {
        continue;
      }
      const val = await provider.get<T>(node);
      result = val;
      break;
    }
    return result;
  }

  /**
   *
   * @param node 配置
   * @param value 配置的值
   * @param storage 指定配置的值存储的scope。默认为配置的scope，
   * @param validate
   * @returns
   */
  async set<T>(
    node: ConfigurationNode<T>,
    value: T,
    storage?: ConfigurationStorage,
    validate?: boolean,
  ) {
    if (validate !== false && !this.schemaValidator.validateNode(node, value)) {
      return;
    }

    const setStorage = storage ?? node.storage ?? DefaultConfigurationStorage;
    this.configurationRegistry.addStorage(setStorage);
    const provider = this.getConfigurationProviderByStorage(setStorage);
    if (!provider) {
      return;
    }
    await provider.set(node, value);
    this.onConfigurationValueChangeEmitter.fire({ key: node.id, value });
  }

  async remove<T>(node: ConfigurationNode<T>) {
    const scopeArray = this.configurationRegistry.getStorages();
    for (const scope of scopeArray.sort((a, b) => b.priority - a.priority)) {
      const provider = this.getConfigurationProviderByStorage(scope);
      if (!provider) {
        continue;
      }
      if (!provider.has(node)) {
        continue;
      }
      provider.remove(node);
    }
  }

  protected getConfigurationProviderByStorage(
    scope: ConfigurationStorage,
  ): ConfigurationProvider | undefined {
    const contribs = this.providers
      .getContributions()
      .map((item) => ({ ...item, priority: item.canHandle(getOrigin(scope)) }))
      .filter((item) => item.priority !== false);
    if (contribs.length === 0) {
      return undefined;
    }
    // 相比sort性能更高
    let maxPriorityProvider = contribs[0];
    for (const provider of contribs) {
      if ((provider.priority as number) > (maxPriorityProvider.priority as number)) {
        maxPriorityProvider = provider;
      }
    }
    return maxPriorityProvider;
  }
}
