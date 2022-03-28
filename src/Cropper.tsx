import React, { useEffect, useRef, useState } from "react";
import Circle from "./shaps/Circle";
interface propsType {
  shap?: string; // circle , square, rectangle,polygon
  onResult: (url: string) => void
}
const DW: number = 10;
const Cropper: React.FC<propsType> = (props: propsType) => {
  const { shap = "rectangle" } = props;

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <img
        src="https://jambo2018.github.io/img/top_img.jpeg"
        width={600}
        height={400}
        style={{ position: "absolute", zIndex: "-1" }}
      />
      <Circle onResult={props.onResult}/>
    </div>
  );
};

export default Cropper;
