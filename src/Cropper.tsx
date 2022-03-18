<<<<<<< HEAD
import Cropper from 'react-easy-crop'
import { useState,useCallback } from 'react';
export default function Demo() {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  return (
    <Cropper
      image={"https://raw.githubusercontent.com/Jambo2018/Jambo2018.github.io/main/img/top_img.jpeg"}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}
=======
import React, { useEffect, useRef } from "react";
interface propsType {
  shap?: String, // circle , square, rectangle,polygon


}
const Cropper: React.FC<propsType> = (props: propsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { shap = "rectangle" } = props;


  // const onCrop = () => {
  //   const imageElement: any = cropperRef?.current;
  //   const cropper: any = imageElement?.cropper;
  //   // console.log(cropper.getCroppedCanvas().toDataURL());
  // };
  // init canvas and paint the background

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#F40";
    ctx.fillRect(0, 0, 20, 60);
  }, [])

  const onMouseDown = (e: any) => {
    const { clientX, clientY } = e;
    console.log("down",clientX, clientY)
  }
  const onMouseEnter = (e: any) => {
    const { clientX, clientY } = e;
    console.log("enter",clientX, clientY)
  }
  const onMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    console.log("move",clientX, clientY)
  }
  const onMouseUp = (e: any) => {
    const { clientX, clientY } = e;
    console.log("up",clientX, clientY)
  }


  return (
    <div style={{ width: "600px", height: "400px"}}>
      <img src="https://jambo2018.github.io/img/top_img.jpeg" width={600} height={400} style={{ position: "absolute", zIndex: "-1" }} />
      <canvas ref={canvasRef} width={600} height={400}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    </div>
  );
};

export default Cropper;
>>>>>>> dev
