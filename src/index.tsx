import React, { useMemo, useRef } from "react";
import RecCom from "./shaps/Rectangle";
import Polygon from "./shaps/Polygon";
import "./index.css";
import { propsType } from "./type";

const defaulConfigs = {
  backgroundColor: "rgba(24,144,255,0.5)",
  maskColor: "rgba(0,0,0,0.6)",
  cropColor: "rgba(24,144,255,1)",
};
const Cropper: React.FC<propsType> = (props: propsType) => {
  const { type = "rectangle", image = "", configs } = props;
  const boxRef = useRef<HTMLDivElement>(null);
  const backgroundColor =
    configs?.backgroundColor || defaulConfigs.backgroundColor;
  const ClipCom = useMemo(() => {
    if (!boxRef.current) return null;
    const { clientWidth, clientHeight } = boxRef.current;
    const config = {
      canvasWidth: clientWidth,
      canvasHeight: clientHeight,
      src: image,
      configs: { ...defaulConfigs, ...configs },
    };

    switch (type) {
      case "rectangle":
        return <RecCom onResult={props.onResult} {...config} />;
      case "square":
        return <RecCom onResult={props.onResult} {...config} square />;
      case "circle":
        return <RecCom onResult={props.onResult} {...config} circle />;
      case "polygon":
        return (
          <Polygon
            onResult={props.onResult}
            dots={props.nodesNum || 4}
            {...config}
          />
        );
      default:
        throw new Error(
          "wrong type,the type could only be circle,square,rectangle or polygon"
        );
        return;
    }
  }, [type, image, boxRef.current]);

  return (
    <div
      ref={boxRef}
      className="box"
      style={{
        ...props.style,
        backgroundImage: `url(${image})`,
        backgroundColor: backgroundColor,
      }}
    >
      {ClipCom}
    </div>
  );
};

export default Cropper;
