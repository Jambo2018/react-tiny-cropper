export type Shap = 'circle' | 'square' | 'rectangle' | 'polygon' | never;
export type ConfigTypes = {
  backgroundColor?: string,
  maskColor?: string,
  cropColor?: string,
}
export interface propsType {
  type?: Shap,
  nodesNum?: number,
  image: string,
  style?: object,
  configs?: ConfigTypes,
  onResult: (url: string) => void
}


export type CropConfigTypes = {
  maskColor: string,
  cropColor: string,
}
export interface cropperType {
  src?: string;
  square?: boolean;
  circle?: boolean;
  dots?: number;
  configs: CropConfigTypes;
  canvasWidth: number;
  canvasHeight: number;
  onResult: (url: string) => void;
}
export type Rectangle = {
  x: number,
  y: number,
  width: number,
  height: number
}
export type Cors = {
  offsetX: number,
  offsetY: number
}

export interface MoveEventCallBack {
  (clientX: number, clientY: number): void
}
export type Last = {
  x: number,
  y: number
}

export type PolyCors = {
  x: number,
  y: number
}