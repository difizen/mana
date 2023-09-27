import type { Newable } from '@difizen/mana-common';
import { useInject, getOrigin } from '@difizen/mana-observable';
import { useUnmount, useMount } from 'ahooks';
import type { ReactNode } from 'react';
import { memo } from 'react';

import { SlotViewManager } from './slot-view-manager';
import { ViewInstance } from './view-protocol';
import type { View } from './view-protocol';
import type { SlotView } from './view-protocol';
import { ViewRender } from './view-render';

export interface Props {
  name: string;
  viewProps?: undefined | Record<string, any>;
  children?: undefined | ReactNode | ReactNode[];
  slotView?: undefined | Newable<View>;
}

const SlotRender = memo(
  function SlotRenderInner(props: {
    view: View | undefined;
    children: React.ReactNode;
    viewProps?: Record<string, any> | undefined;
  }) {
    const { view, children, viewProps } = props;
    if (view) {
      return (
        <ViewRender view={view} {...viewProps}>
          {children}
        </ViewRender>
      );
    }
    return <></>;
  },
  (prev, next) => {
    return (
      prev.view === next.view &&
      prev.children === next.children &&
      prev.viewProps === next.viewProps
    );
  },
);

const useSlotView = (
  name: string,
  slotView?: Newable<View>,
): [View | undefined, SlotViewManager] => {
  const slotViewManager = useInject(SlotViewManager);
  if (slotView) {
    slotViewManager.setComponentSlotPreference(name, { slot: name, view: slotView });
  }
  slotViewManager.slotRendering(name);
  const containerView = useInject<SlotView>(ViewInstance);
  const areaView = slotViewManager.slotViewMap.get(name);
  useMount(() => {
    slotViewManager.getOrCreateSlotView(name, slotView);
    slotViewManager.addSlotToView(name, getOrigin(containerView));
  });
  useUnmount(() => {
    slotViewManager.removeSlotFromView(name, getOrigin(containerView));
  });
  return [areaView, slotViewManager];
};

export const Slot: React.FC<Props> = (props: Props) => {
  const { name, children, viewProps, slotView } = props;
  const [areaView] = useSlotView(name, slotView);
  return (
    <SlotRender view={areaView} viewProps={viewProps}>
      {children}
    </SlotRender>
  );
};
