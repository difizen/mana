/* eslint-disable @typescript-eslint/no-unused-vars */
import { Emitter } from '@difizen/mana-common';
import { URI } from '@difizen/mana-common';
import { singleton } from '@difizen/mana-syringe';

import type {
  CopyFileOptions,
  MoveFileOptions,
  ResolveFileOptions,
  FileChangesEvent,
  FileOperationEvent,
  FileStatWithMetadata,
} from './files';

const defaultFileMeta = {
  mtime: 0,
  ctime: 0,
  etag: '',
  size: 0,
  isFile: false,
  isDirectory: false,
  isSymbolicLink: false,
};
@singleton()
export class FileService {
  // #region File Watching

  private onDidFilesChangeEmitter = new Emitter<FileChangesEvent>();
  /**
   * An event that is emitted when files are changed on the disk.
   */
  readonly onDidFilesChange = this.onDidFilesChangeEmitter.event;

  // #endregion

  private onDidRunOperationEmitter = new Emitter<FileOperationEvent>();
  /**
   * An event that is emitted when operation is finished.
   * This event is triggered by user gestures and programmatically.
   */
  readonly onDidRunOperation = this.onDidRunOperationEmitter.event;

  async copy(
    source: URI,
    _target: URI,
    _options?: CopyFileOptions,
  ): Promise<FileStatWithMetadata> {
    return this.resolve(source);
  }
  async move(
    source: URI,
    _target: URI,
    _options?: MoveFileOptions,
  ): Promise<FileStatWithMetadata> {
    return this.resolve(source);
  }
  async resolve(
    resource: URI,
    _options?: ResolveFileOptions | undefined,
  ): Promise<FileStatWithMetadata> {
    if (resource.path.isRoot) {
      return {
        ...defaultFileMeta,
        isDirectory: true,
        name: resource.path.isRoot ? resource.path.toString() : resource.path.base,
        resource,
        children: [
          {
            ...defaultFileMeta,
            isFile: true,
            name: 'a.sql',
            resource: URI.resolve(resource, 'a.sql'),
          },
          {
            ...defaultFileMeta,
            isFile: true,
            name: 'b.py',
            resource: URI.resolve(resource, 'b.py'),
          },
          {
            ...defaultFileMeta,
            isFile: true,
            name: 'c.ipynb',
            resource: URI.resolve(resource, 'c.ipynb'),
          },
          {
            ...defaultFileMeta,
            isDirectory: true,
            name: 'dir',
            resource: URI.resolve(resource, 'dir'),
          },
        ],
      };
    }
    if (resource.path.name.includes('.')) {
      return {
        mtime: 0,
        ctime: 0,
        etag: '',
        size: 0,
        isFile: true,
        isDirectory: false,
        isSymbolicLink: false,
        name: resource.path.isRoot ? resource.path.toString() : resource.path.base,
        resource,
      };
    }
    return {
      mtime: 0,
      ctime: 0,
      etag: '',
      size: 0,
      isFile: false,
      isDirectory: true,
      isSymbolicLink: false,
      name: resource.path.isRoot ? resource.path.toString() : resource.path.base,
      resource,
      children: [
        {
          ...defaultFileMeta,
          isFile: true,
          name: 'a.sql',
          resource: URI.resolve(resource, 'a.sql'),
        },
        {
          ...defaultFileMeta,
          isFile: true,
          name: 'b.py',
          resource: URI.resolve(resource, 'b.py'),
        },
        {
          ...defaultFileMeta,
          isFile: true,
          name: 'c.ipynb',
          resource: URI.resolve(resource, 'c.ipynb'),
        },
        {
          ...defaultFileMeta,
          isDirectory: true,
          name: 'dir',
          resource: URI.resolve(resource, 'dir'),
        },
      ],
    };
  }
}
