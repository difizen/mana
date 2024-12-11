import type { Newable } from '@difizen/mana-common';
import type { Syringe } from '@difizen/mana-syringe';
import { registerSideOption } from '@difizen/mana-syringe';
import type { ComponentType } from 'react';

import type { ManaModule } from '../module';
import { ManaContext } from '../module';

import { isWrapperViewComponent, ViewWrapper } from './view-container';
import { ViewManager } from './view-manager';
import type { View, SlotPreference, ViewPreference } from './view-protocol';
import { ViewComponentToken } from './view-protocol';
import { OriginViewComponent, ViewComponent } from './view-protocol';
import { SlotPreferenceContribution } from './view-protocol';
import {
  ViewDefineToken,
  ViewInstance,
  ViewOption,
  ViewFactory,
  ViewPreferenceContribution,
} from './view-protocol';

export const createViewPreference = (...preferences: ViewPreference[]) => {
  return { token: ViewPreferenceContribution, useValue: preferences };
};

export const createSlotPreference = (...preferences: SlotPreference[]) => {
  return { token: SlotPreferenceContribution, useValue: preferences };
};

export interface ViewDecoratorOption {
  asChild?: boolean;
  registry?: Syringe.Registry;
}

interface ViewMeta {
  id: string;
  component: ComponentType;
}

export function view<T extends View>(meta: ViewMeta): (target: Newable<T>) => void;
export function view<T extends View>(
  factoryId: string,
  viewModule?: ManaModule,
): (target: Newable<T>) => void;
export function view<T extends View>(
  metaOrFactoryId: string | ViewMeta,
  viewModule?: ManaModule,
) {
  return (target: Newable<T>): void => {
    let factoryId: string;
    if (typeof metaOrFactoryId === 'string') {
      factoryId = metaOrFactoryId;
    } else {
      factoryId = metaOrFactoryId.id;
      Reflect.defineMetadata(ViewComponentToken, metaOrFactoryId.component, target);
    }
    Reflect.defineMetadata(ViewDefineToken, factoryId, target);
    registerSideOption(
      {
        token: ViewFactory,
        useDynamic: (ctx: Syringe.Context) => ({
          id: factoryId,
          createView: async (viewOption: any, specModule?: ManaModule) => {
            const module = specModule || viewModule;
            let { container } = ctx;
            container = ctx.container.createChild();
            const context = new ManaContext(container);
            if (module) {
              await context.load(module);
            }
            container.register({ token: ViewOption, useValue: viewOption });
            const current = container.get<View>(target);
            container.register({ token: ViewInstance, useValue: current });

            const constructor = current.constructor as any;
            const metaComponent = Reflect.getMetadata(ViewComponentToken, constructor);
            const maybeComponent = metaComponent || (current.view as any);
            const component = maybeComponent;
            // if (isPromise(maybeComponent)) {
            //   component = await maybeComponent;
            // }
            container.register({
              token: OriginViewComponent,
              useDynamic: () => {
                if (isWrapperViewComponent(component)) {
                  return component[OriginViewComponent];
                } else {
                  return component;
                }
              },
            });
            const viewComponent = ViewWrapper(component, container);
            container.register({
              token: ViewComponent,
              useDynamic: () => {
                if (isWrapperViewComponent(component)) {
                  return component;
                } else {
                  return ViewWrapper(current.view, container);
                }
              },
            });
            current.view = viewComponent;
            const manager = container.get(ViewManager);
            manager.setViewContext(current, context);
            return current;
          },
        }),
      },
      target,
    );
  };
}
