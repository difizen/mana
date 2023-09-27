import { Syringe } from '@difizen/mana-syringe';

import type { ColorRegistry } from './color-registry';

export const ColorContribution = Syringe.defineToken('ColorContribution');
export type ColorContribution = {
  registerColors: (colors: ColorRegistry) => void;
};
