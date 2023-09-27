/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable class-methods-use-this */
import { DisposableCollection, Disposable, Emitter } from '@difizen/mana-common';
import { singleton, inject } from '@difizen/mana-syringe';

import { ThemeService } from '../theme-service';

import * as VSColor from './color';

/**
 * Either be a reference to an existing color or a color value as a hex string, rgba, or hsla.
 */
export type Color = string | RGBA | HSLA | ColorTransformation;
export namespace Color {
  export function rgba(r: number, g: number, b: number, a = 1): Color {
    return { r, g, b, a };
  }
  export function hsla(h: number, s: number, l: number, a = 1): Color {
    return { h, s, l, a };
  }
  export const white = rgba(255, 255, 255, 1);
  export const black = rgba(0, 0, 0, 1);
  export function transparent(v: string, f: number): ColorTransformation {
    return { v, f, kind: 'transparent' };
  }
  export function lighten(v: string, f: number): ColorTransformation {
    return { v, f, kind: 'lighten' };
  }
  export function darken(v: string, f: number): ColorTransformation {
    return { v, f, kind: 'darken' };
  }
}
export type ColorTransformation = {
  kind: 'transparent' | 'lighten' | 'darken';
  v: string;
  f: number;
};
export type RGBA = {
  /**
   * Red: integer in [0-255]
   */
  readonly r: number;

  /**
   * Green: integer in [0-255]
   */
  readonly g: number;

  /**
   * Blue: integer in [0-255]
   */
  readonly b: number;

  /**
   * Alpha: float in [0-1]
   */
  readonly a: number;
};
export type HSLA = {
  /**
   * Hue: integer in [0, 360]
   */
  readonly h: number;
  /**
   * Saturation: float in [0, 1]
   */
  readonly s: number;
  /**
   * Luminosity: float in [0, 1]
   */
  readonly l: number;
  /**
   * Alpha: float in [0, 1]
   */
  readonly a: number;
};

export interface ColorDefinition {
  id: string;
  defaults?:
    | {
        light?: Color;
        dark?: Color;
        hc?: Color;
        [key: string]: Color | undefined;
      }
    | undefined;
  description: string;
}

export type ColorCssVariable = {
  name: string;
  value: string;
};

/**
 * It should be implemented by an extension, e.g. by the monaco extension.
 */
@singleton()
export class ColorRegistry {
  private definitionList: ColorDefinition[] = [];

  protected readonly onDidChangeEmitter = new Emitter<void>();

  readonly onDidChange = this.onDidChangeEmitter.event;

  protected readonly themeService: ThemeService;

  constructor(
    @inject(ThemeService)
    themeService: ThemeService,
  ) {
    this.themeService = themeService;
  }

  protected fireDidChange(): void {
    this.onDidChangeEmitter.fire(undefined);
  }

  *getColors(): IterableIterator<string> {
    // eslint-disable-next-line no-restricted-syntax
    for (const definition of this.definitionList) {
      yield definition.id;
    }
  }

  getCurrentCssVariable(id: string): ColorCssVariable | undefined {
    const value = this.getCurrentColor(id);
    if (!value) {
      return undefined;
    }
    const name = this.toCssVariableName(id);
    return { name, value };
  }

  toCssVariableName(id: string, prefix = 'mana'): string {
    return `--${prefix}-${id.replace(/\./g, '-')}`;
  }

  getCurrentColor(id: string): string | undefined {
    const theme = this.themeService.getActiveTheme();
    const { type, extraTokens } = theme;
    if (extraTokens && extraTokens.color && extraTokens.color[id]) {
      return this.toColor(extraTokens.color[id])?.toString();
    }
    const definition = this.definitionList.find((definition) => definition.id === id);
    if (definition && definition.defaults && definition.defaults[type]) {
      return this.toColor(definition.defaults[type])?.toString();
    }
    return undefined;
  }

  register(...definitions: ColorDefinition[]): Disposable {
    const result = new DisposableCollection(
      ...definitions.map((definition) => this.doRegister(definition)),
    );
    this.fireDidChange();
    return result;
  }

  protected doRegister(definition: ColorDefinition): Disposable {
    this.definitionList.push({
      id: definition.id,
      defaults: definition.defaults,
      description: definition.description,
    });
    return Disposable.NONE;
  }

  protected toColor(value: Color | undefined): string | VSColor.Color | undefined {
    if (!value) {
      return undefined;
    }
    if (typeof value === 'string') {
      if (value[0] === '#') {
        return VSColor.Color.fromHex(value);
      }
      return this.toColor(this.getCurrentColor(value));
    }
    if ('kind' in value) {
      const colorValue = this.getCurrentColor(value.v);
      if (colorValue) {
        const color = VSColor.Color.fromHex(colorValue);
        return color[value.kind](value.f);
      }
      return undefined;
    }
    if ('r' in value) {
      const { r, g, b, a } = value;
      return new VSColor.Color(new VSColor.RGBA(r, g, b, a));
    }
    const { h, s, l, a } = value;
    return new VSColor.Color(new VSColor.HSLA(h, s, l, a));
  }
}
