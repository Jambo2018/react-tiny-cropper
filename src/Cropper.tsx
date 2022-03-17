import React, { useEffect, useRef } from "react";
const Cropper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  return (
    <div style={{ width: "300px", height: "200px", background: "rgba(0,0,0,0.3)" }}>
      <img src="https://jambo2018.github.io/img/top_img.jpg" width={300} height={200} style={{position:"absolute",zIndex:"-1"}}/>
      <canvas ref={canvasRef} width={300} height={200} />
    </div>
  );
};

export default Cropper;