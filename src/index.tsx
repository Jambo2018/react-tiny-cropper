import React, { useMemo, useRef } from "react";
import RecCom from "./shaps/Rectangle";
import Polygon from "./shaps/Polygon";
import "./index.css";

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
const Cropper: React.FC<propsType> = (props: propsType) => {
  const { type = "rectangle", image = "" } = props;
  const boxRef = useRef<HTMLDivElement>(null);


  const ClipCom = useMemo(() => {
    if (!boxRef.current) return null;
    const { clientWidth, clientHeight } = boxRef.current;
    const config = {
      canvasWidth: clientWidth,
      canvasHeight: clientHeight,
      src: image,
    }

    switch (type) {
      case "rectangle":
        return <RecCom onResult={props.onResult} {...config} />
      case "square":
        return <RecCom onResult={props.onResult} {...config} square />
      case "circle":
        return <RecCom onResult={props.onResult} {...config} circle />
      case "polygon":
        return <Polygon onResult={props.onResult} dots={props.nodesNum || 4} {...config} />
      default:
        throw new Error("wrong type,the type could only be circle,square,rectangle or polygon");
        return;
    }
  }, [type, image])


  return (
    <div ref={boxRef} className="box" style={{ ...props.style, backgroundImage: `url(${image})` }}>
      {ClipCom}
    </div>
  );
};




export default Cropper;