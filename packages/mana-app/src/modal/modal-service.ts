import type { Disposable } from '@difizen/mana-common';
import { ApplicationContribution } from '@difizen/mana-core';
import { prop } from '@difizen/mana-observable';
import type { Contribution } from '@difizen/mana-syringe';
import { contrib, singleton, Syringe } from '@difizen/mana-syringe';

export interface ModalItemProps<T> {
  modalItem: ModalItem<T>;
  data: T;
  visible: boolean;
  close: () => void;
}

export interface ModalItem<T = void> {
  id: string;
  component: React.FC<ModalItemProps<T>>;
  __data?: T;
}

export class ModalItemView<T> implements Disposable {
  @prop()
  modalItem: ModalItem<T>;

  @prop()
  modalVisible = false;

  @prop()
  modalData?: T | undefined;

  constructor(modalItem: ModalItem<T>) {
    this.modalItem = modalItem;
  }

  open = (data?: T) => {
    this.modalVisible = true;
    this.modalData = data;
  };

  close = () => {
    this.modalVisible = false;
    this.modalData = undefined;
  };

  disposed = false;
  dispose() {
    this.disposed = true;
    this.close();
  }
}

export const ModalContribution = Syringe.defineToken('ModalContribution');
export interface ModalContribution {
  registerModal?: () => ModalItem<any>;
  registerModals?: () => ModalItem<any>[];
}

@singleton({ contrib: [ApplicationContribution] })
export class ModalService implements ApplicationContribution {
  protected modals = new Map<string, ModalItem>();

  @prop()
  modalViewList: ModalItemView<any>[] = [];

  protected readonly contributions: Contribution.Provider<ModalContribution>;

  constructor(
    @contrib(ModalContribution) contributions: Contribution.Provider<ModalContribution>,
  ) {
    this.contributions = contributions;
  }

  onStart() {
    this.contributions.getContributions().forEach((contribution) => {
      if (contribution.registerModal) {
        const modalItem = contribution.registerModal();
        this.registerModal(modalItem);
      }
      if (contribution.registerModals) {
        const modalItems = contribution.registerModals();
        this.registerModals(modalItems);
      }
    });
  }

  hasModal(modal: ModalItem<any>): boolean {
    return this.modals.has(modal.id);
  }

  getModal<T>(modal: ModalItem<T>) {
    return this.modals.get(modal.id);
  }

  registerModal(modal: ModalItem) {
    this.modals.set(modal.id, modal);
  }

  registerModals(modals: ModalItem<any>[]) {
    modals.forEach((item) => {
      this.registerModal(item);
    });
  }

  unregisterModal(modal: ModalItem) {
    this.modals.delete(modal.id);
  }

  getOrCreateModalView<T>(modal: ModalItem<T>) {
    let viewInstance = this.modalViewList.find(
      (item) => item.modalItem.id === modal.id,
    );
    if (!viewInstance) {
      const modalItem = this.getModal(modal);
      if (!modalItem) {
        throw Error(`should have modal ${modal.id} registed`);
      }
      viewInstance = new ModalItemView(modalItem);
      this.modalViewList.push(viewInstance);
    }
    return viewInstance;
  }

  openModal = <T>(modal: ModalItem<T>, data?: T) => {
    if (this.hasModal(modal)) {
      const modalView = this.getOrCreateModalView(modal);
      modalView.open(data);
    }
  };

  closeModal = (modal: ModalItem<any>) => {
    this.modalViewList.find((item) => item.modalItem.id === modal.id)?.close();
  };

  closeAllModal = () => {
    this.modalViewList.forEach((item) => item.close());
  };
}
