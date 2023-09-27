import type { MaybePromise } from '@difizen/mana-common';

import type { DebugService } from './debug';
import { debug } from './debug';
import type { LocalStorage, StorageService } from './storage-protocol';

export class LocalStorageService implements StorageService {
  private storage: LocalStorage = {};
  protected logger: DebugService;

  constructor() {
    this.logger = debug;
    if (typeof window !== 'undefined' && window.localStorage) {
      this.storage = window.localStorage;
      this.testLocalStorage();
    } else {
      this.logger.log("The browser doesn't support localStorage.");
      this.storage = {};
    }
  }

  setData<T>(key: string, data?: T): MaybePromise<void> {
    if (data !== undefined) {
      try {
        this.storage[this.prefix(key)] = JSON.stringify(data);
      } catch (e) {
        this.showDiskQuotaExceededMessage();
      }
    } else {
      delete this.storage[this.prefix(key)];
    }
    return;
  }

  getData<T>(key: string, defaultValue?: T): MaybePromise<T> {
    const result = this.storage[this.prefix(key)];
    if (result === undefined) {
      return defaultValue as any;
    }
    return JSON.parse(result) as any;
  }

  protected prefix(key: string): string {
    const pathname = typeof window === 'undefined' ? '' : window.location.pathname;
    return `mana:${pathname}:${key}`;
  }

  // TODO
  private async showDiskQuotaExceededMessage(): Promise<void> {
    //
  }

  /**
   * Verify if there is still some spaces left to save another workspace configuration into the local storage of your browser.
   * If we are close to the limit, use a dialog to notify the user.
   */
  private testLocalStorage(): void {
    const keyTest = this.prefix('Test');
    try {
      this.storage[keyTest] = JSON.stringify(new Array(60000));
    } catch (error) {
      this.showDiskQuotaExceededMessage();
    } finally {
      this.storage.removeItem?.(keyTest);
    }
  }

  clearStorage(): void {
    this.storage.clear?.();
  }
}

export const localStorageService = new LocalStorageService();
