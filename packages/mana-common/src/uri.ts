import { URI as Uri } from 'vscode-uri';

import { Path } from './path';

export class URI {
  private readonly codeUri: Uri;
  private _path: Path | undefined;

  constructor(uri: string | Uri = '') {
    if (uri instanceof Uri) {
      this.codeUri = uri;
    } else {
      this.codeUri = Uri.parse(uri);
    }
  }

  get parent(): URI {
    if (this.path.isRoot) {
      return this;
    }
    return URI.withPath(this, this.path.dir);
  }

  relative(uri: URI): Path | undefined {
    if (this.authority !== uri.authority || this.scheme !== uri.scheme) {
      return undefined;
    }
    return Path.relative(this.path, uri.path);
  }

  /**
   * return a new URI replacing the current with its normalized path, resolving '..' and '.' segments
   */
  normalizePath(): URI {
    return URI.withPath(this, Path.normalize(this.path));
  }

  get scheme(): string {
    return this.codeUri.scheme;
  }

  get authority(): string {
    return this.codeUri.authority;
  }

  get path(): Path {
    if (this._path === undefined) {
      this._path = new Path(this.codeUri.path);
    }
    return this._path;
  }

  get query(): string {
    return this.codeUri.query;
  }

  get fragment(): string {
    return this.codeUri.fragment;
  }

  toString(skipEncoding?: boolean): string {
    return this.codeUri.toString(skipEncoding);
  }

  toJSON(): any {
    return {
      ...this.codeUri.toJSON(),
      scheme: this.codeUri.scheme,
    };
  }

  equals(uri: URI, caseSensitive = true): boolean {
    if (!this.sameOrigin(uri)) {
      return false;
    }

    return caseSensitive
      ? this.toString() === uri.toString()
      : this.toString().toLowerCase() === uri.toString().toLowerCase();
  }

  includes(uri: URI, caseSensitive = true): boolean {
    if (!this.sameOrigin(uri)) {
      return false;
    }
    let left = this.path;
    let right = uri.path;
    if (!caseSensitive) {
      left = new Path(left.toString().toLowerCase());
      right = new Path(right.toString().toLowerCase());
    }
    return left.includes(right);
  }

  protected sameOrigin(uri: URI): boolean {
    return this.authority === uri.authority && this.scheme === uri.scheme;
  }

  static resolve(uri: URI, path: string | Path): URI {
    return URI.withPath(uri, Path.join(uri.path, path.toString()));
  }

  /**
   * return a new URI replacing the current with the given scheme
   */
  static withScheme(uri: URI, scheme: string): URI {
    const newCodeUri = Uri.from({
      ...uri.toJSON(),
      scheme,
    });
    return new URI(newCodeUri);
  }

  /**
   * return a new URI replacing the current with the given authority
   */
  static withAuthority(uri: URI, authority = ''): URI {
    const newCodeUri = Uri.from({
      ...uri.toJSON(),
      authority,
    });
    return new URI(newCodeUri);
  }

  /**
   * return a new URI replacing the current with the given path
   */
  static withPath(uri: URI, path: string | Path = ''): URI {
    const newCodeUri = Uri.from({
      ...uri.toJSON(),
      path: path.toString(),
    });
    return new URI(newCodeUri);
  }

  /**
   * return a new URI replacing the current with the given query
   */
  static withQuery(uri: URI, query = ''): URI {
    const newCodeUri = Uri.from({
      ...uri.toJSON(),
      query,
    });
    return new URI(newCodeUri);
  }

  /**
   * return a new URI replacing the current with the given fragment
   */
  static withFragment(uri: URI, fragment = ''): URI {
    const newCodeUri = Uri.from({
      ...uri.toJSON(),
      fragment,
    });
    return new URI(newCodeUri);
  }
}
