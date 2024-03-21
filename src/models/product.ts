export type ColorValueHex = `#${string}`;
export type PantoneFormat = `${number}-${number}`;

export interface Product {
  id: number;
  name: string;
  year: number;
  color: ColorValueHex;
  pantone_value: PantoneFormat;
}
