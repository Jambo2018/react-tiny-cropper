import { useEffect } from "react";
import Circle from "./shaps/Circle";
import Rectangle from "./shaps/Rectangle";
import Polygon from "./shaps/Polygon";

type Shap = 'circle' | 'square' | 'rectangle' | 'polygon' | never;
interface propsType {
  type: Shap,
  nodesNum?: number,
  image: string,
  style:object,
  onResult: (url: string) => void
}
const Cropper: React.FC<propsType> = (props: propsType) => {
  const { type = "rectangle", image = "" } = props;
  const ClipCom = () => {
    switch (type) {
      case "rectangle":
        return <Rectangle onResult={props.onResult} src={image} />
      case "square":
        return <Rectangle onResult={props.onResult} src={image} square />
      case "circle":
        return <Circle onResult={props.onResult} src={image} />
      case "polygon":
        return <Polygon onResult={props.onResult} dots={props.nodesNum||4} src={image} />
      default:
        throw new Error("wrong type,the type could only be circle,square,rectangle or polygon");
        break;
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" ,...props.style,background:"#aaa"}}>
      <img
        src={image}
        width={600}
        height={400}
        style={{ position: "absolute", zIndex: "-1" }}
      />
      {ClipCom()}
      {/* <ClipCom/> */}
    </div>
  );
};

export default Cropper;
