import { BaseView, view } from '@difizen/mana-core';
import { useInject } from '@difizen/mana-observable';
import { singleton } from '@difizen/mana-syringe';
import React from 'react';

import type { ModalItemView } from './modal-service';
import { ModalService } from './modal-service';

const ModalItemRender: React.FC<{ modalItemView: ModalItemView<any> }> = ({
  modalItemView,
}) => {
  if (modalItemView.modalVisible !== true) {
    return null;
  }

  const Modal = modalItemView.modalItem.component;

  if (!Modal) {
    console.warn(`${modalItemView.modalItem.id} is not valid modal`);
    return null;
  }

  return (
    <Modal
      modalItem={modalItemView.modalItem}
      data={modalItemView.modalData}
      visible={modalItemView.modalVisible}
      close={modalItemView.close}
    />
  );
};

const ModalRender: React.FC = React.forwardRef(function ModalRender() {
  const modalService = useInject(ModalService);

  return (
    <div className="mana-modal-render">
      {modalService.modalViewList.map((item) => (
        <ModalItemRender key={item.modalItem.id} modalItemView={item} />
      ))}
    </div>
  );
});

@singleton()
@view('modal-render-view')
export class ModalRenderView extends BaseView {
  override view = ModalRender;
}
