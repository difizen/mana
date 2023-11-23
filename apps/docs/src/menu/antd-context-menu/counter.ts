import { prop, singleton } from '@difizen/mana-app';

@singleton()
export class Counter {
  @prop()
  count = 0;
}
