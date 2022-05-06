 type Shap = 'circle' | 'square' | 'rectangle' | 'polygon' | never;
 type ConfigTypes = {
    backgroundColor?: string,
    maskColor?: string,
    cropColor?: string,
  }
 interface propsType {
    type: Shap,
    nodesNum?: number,
    image: string,
    style?: object,
    configs?:ConfigTypes,
    onResult: (url: string) => void
  }


  export {Shap,ConfigTypes,propsType};