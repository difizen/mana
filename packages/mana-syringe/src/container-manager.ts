import type { interfaces } from 'inversify';

import type { Syringe } from './core';

export class ContainerManager {
  cache = new Map<number, Syringe.Container>();
  toContainer?: (ctn: interfaces.Container) => Syringe.Container;
  setContainer(ctn: interfaces.Container, value: Syringe.Container) {
    return this.cache.set(ctn.id, value);
  }
  getContainer(ctn: interfaces.Container) {
    const exist = this.cache.get(ctn.id);
    if (!exist) {
      if (this.toContainer) {
        const container = this.toContainer(ctn);
        this.setContainer(ctn, container);
        return container;
      }
    }
    return exist;
  }
}

export const DefaultContainerManager = new ContainerManager();
