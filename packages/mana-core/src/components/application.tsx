/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import { ApplicationState, ApplicationStateService } from '../application';
import { Application, ApplicationModule } from '../application';
import type { ManaContext } from '../module';
import { ManaModule } from '../module';
import { useMount, useUnmount } from '../utils/hooks';
import { createSlotPreference, PortalSlotId, Slot } from '../view';
import { PortalSlotView } from '../view/portal-slot-view';
import { RootComponents } from '../view/root-view';

import type { ContextProps } from './context';
import { ContextComponent } from './context';
import { RootViewRender } from './root-view-render';
import './index.less';

const PortalModule = ManaModule.create().register(
  createSlotPreference({ slot: PortalSlotId, view: PortalSlotView }),
);

export interface ApplicationProps extends ContextProps {
  onReady?: (ctx: ManaContext, app: Application) => void;
  /**
   * 使用路由模式时需要开启
   */
  renderChildren?: boolean;
  renderAfterReady?: boolean;
}

export const ApplicationComponent = (props: ApplicationProps) => {
  const {
    onReady,
    modules = [],
    loading,
    renderChildren = false,
    renderAfterReady = false,
  } = props;
  const nextModels = React.useMemo(() => {
    return [ApplicationModule, PortalModule, ...modules];
  }, [modules]);

  const hostRef = React.createRef<HTMLDivElement>();
  const [ready, setReady] = React.useState(false);
  const [appReady, setAppReady] = React.useState(false);
  const [application, setApplication] = React.useState<Application | undefined>(
    undefined,
  );
  const LoadingComponent = () =>
    loading ? <div className="mana-preload">{loading}</div> : null;
  const onModuleReady = (ctx: ManaContext) => {
    const current = hostRef.current;
    setReady(true);
    const app = ctx.container.get(Application);
    setApplication(app);
    const rootComponents = ctx.container.get<RootComponents>(RootComponents);
    if (!rootComponents.Loading) {
      rootComponents.Loading = LoadingComponent;
    }
    const appState = ctx.container.get(ApplicationStateService);
    if (current && app) {
      app.host = current;
    }
    app.start();
    appState
      .reachedState(ApplicationState.Ready)
      .then(() => {
        if (onReady) {
          setAppReady(true);
          onReady(ctx, app);
        }
        return;
      })
      .catch((_e) => {
        //
      });
  };
  useMount(() => {
    if (hostRef.current && application) {
      application.host = hostRef.current;
      application.mount();
    }
  });
  useUnmount(() => {
    if (application) {
      application.unmount();
    }
  });
  const loadingValue = loading ? <LoadingComponent /> : null;
  const renderContent = () => {
    if (!ready) {
      // 模块加载未完成
      return loadingValue;
    }
    if (!renderChildren) {
      // 基于 rootSlot 渲染
      return (
        <>
          <RootViewRender loading={loadingValue} />
          <Slot name={PortalSlotId} viewProps={{ shadow: true }} />
        </>
      );
    }
    if (appReady || !renderAfterReady) {
      // 模块加载完成 或 renderAfterReady 情况下 app 启动完成
      return (
        <>
          {props.children}
          <Slot name={PortalSlotId} viewProps={{ shadow: true }} />
        </>
      );
    }
    // renderAfterReady 情况下 app 未启动完成
    return loadingValue;
  };
  return (
    <div ref={hostRef} className="mana-app" tabIndex={1}>
      <ContextComponent
        {...props}
        loading={loadingValue}
        modules={nextModels}
        onReady={onModuleReady}
      >
        {renderContent()}
      </ContextComponent>
    </div>
  );
};
