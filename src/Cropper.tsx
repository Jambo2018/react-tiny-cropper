import { useEffect, useMemo, useRef } from "react";
import Circle from "./shaps/Circle";
import Rectangle from "./shaps/Rectangle";
import Polygon from "./shaps/Polygon";
import "./App.css";

type Shap = 'circle' | 'square' | 'rectangle' | 'polygon' | never;
interface propsType {
  type: Shap,
  nodesNum?: number,
  image: string,
  style: object,
  onResult: (url: string) => void
}
const Cropper: React.FC<propsType> = (props: propsType) => {
  const { type = "rectangle", image = "" } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const ClipCom = useMemo(() => {
    if (!boxRef.current) return null;
    const { clientWidth, clientHeight } = boxRef.current;
    console.log(clientWidth,clientHeight)
    console.log(clientWidth,clientHeight)
    const config = { 
      canvasWidth: clientWidth, 
      canvasHeight: clientHeight,
      src:image
    }
    
    switch (type) {
      case "rectangle":
        return <Rectangle onResult={props.onResult} {...config} />
      case "square":
        return <Rectangle onResult={props.onResult} {...config}  square />
      case "circle":
        return <Circle onResult={props.onResult} {...config}  />
      case "polygon":
        return <Polygon onResult={props.onResult} dots={props.nodesNum || 4} {...config}  />
      default:
        throw new Error("wrong type,the type could only be circle,square,rectangle or polygon");
        return;
    }
  }, [type, image])


  return (
    <div ref={boxRef} className="box" style={{ border: "5px solid #f40", ...props.style, backgroundImage: `url(${image})` }}>
      {/* <img
        src={image}
        // width={600}
        // height={400}
        style={{ position: "absolute", zIndex: "-1", }}
      /> */}
      {ClipCom}
      {/* <ClipCom/> */}
    </div>
  );
};

export default Cropper;
