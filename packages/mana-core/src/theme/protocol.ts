export type CssVariable = {
  name: string;
  value: string;
};

export interface VariableDefinition<T = any> {
  id: string;
  defaults?:
    | {
        light: T;
        dark: T;
        [key: string]: T;
      }
    | undefined;
  description: string;
}
