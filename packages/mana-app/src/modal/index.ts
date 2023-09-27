import { createViewPreference, ManaModule, PortalSlotId } from '@difizen/mana-core';
import { ModalRenderView } from './modal-render';
import { ModalContribution, ModalService } from './modal-service';

export * from './modal-render';
export * from './modal-service';

export const ModalModule = ManaModule.create()
  .register(
    ModalService,
    ModalRenderView,
    createViewPreference({
      view: ModalRenderView,
      slot: PortalSlotId,
      autoCreate: true,
    }),
  )
  .contribution(ModalContribution);

// @TODO 兼容break，下个大版本删除
export const ModalRender: React.FC = () => {
  return null;
};
