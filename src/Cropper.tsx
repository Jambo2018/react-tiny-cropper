import React, { useEffect, useRef, useState } from "react";
import Circle from "./shaps/Circle";
interface propsType {
  shap?: string; // circle , square, rectangle,polygon
  onResult: (url: string) => void
}

const DW: number = 10;
const Cropper: React.FC<propsType> = (props: propsType) => {
  let lastX: number, lastY: number;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circle, setCircle] = useState({ x: 100, y: 100, radius: 50 });
  const [position, setPosition] = useState(0);
  const [last, setLast] = useState({ x: 0, y: 0 });
  const { shap = "rectangle" } = props;
  // const onCrop = () => {
  //   const imageElement: any = cropperRef?.current;
  //   const cropper: any = imageElement?.cropper;
  //   // console.log(cropper.getCroppedCanvas().toDataURL());
  // };
  // init canvas and paint the background


  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;
  //   const {width,height}=canvas;
  //   Circle.init(ctx,width,height);
  //   // ctx.fillStyle = "#F40";
  //   // // ctx.beginPath();
  //   // // ctx.strokeStyle="#F40"
  //   // // ctx.arcTo(100,100,100,100,100);
  //   // // ctx.stroke()
  //   // const { x, y, radius } = circle;
  //   // ctx.beginPath();
  //   // ctx.arc(x, y, radius, 0, 2 * Math.PI);
  //   // ctx.stroke();
  //   // ctx.fillRect(x + radius - DW / 2, y - DW / 2, DW, DW);
  //   // ctx.closePath();
  // }, []);

  // function paint() {
  //   // console.log("paint")
  //   if (!canvasRef.current) return;
  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;
  //   // const { x, y, radius } = circle;
  //   // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   // ctx.beginPath();
  //   // ctx.arc(x, y, radius, 0, 2 * Math.PI);
  //   // ctx.stroke();
  //   // ctx.closePath();
  //   // ctx.fillRect(x + radius - DW / 2, y - DW / 2, DW, DW);

  //   // const cropper:HTMLCanvasElement=document.createElement("canvas");
  //   // cropper.width=radius*2
  //   // cropper.height=radius*2
  //   // const cropper_ctx=cropper.getContext("2d");
  //   // let img=new Image();
  //   // img.setAttribute("crossOrigin",'anonymous')
  //   // img.src="https://jambo2018.github.io/img/top_img.jpeg"
  //   // img.onload=function(){
  //   //   cropper_ctx?.beginPath();
  //   //   cropper_ctx?.arc(radius, radius, radius, 0, 2 * Math.PI);
  //   //   cropper_ctx?.clip();
  //   //   const mW=600/img.width;
  //   //   const mH=400/img.height;
  //   //   cropper_ctx?.drawImage(img,(x-radius)/mW,(y-radius)/mH,radius*2/mW,radius*2/mH,0,0,radius*2,radius*2)
  //   //  props.onResult( cropper?.toDataURL())
  //   // }
  // }

  // const onMouseDown = (e: any) => {
  //   // console.log("down",last)
  //   Circle.onMouseDown(e);
  //   // const { x, y, radius } = circle;
  //   // const { clientX, clientY } = e;
  //   // let last = { x, y };
  //   // if (
  //   //   Math.pow(clientX - x, 2) + Math.pow(clientY - y, 2) <
  //   //   Math.pow(radius - DW / 2, 2)
  //   // ) {
  //   //   setPosition(1);
  //   //   last.x = clientX;
  //   //   last.y = clientY;
  //   //   setLast(last);
  //   // } else if (
  //   //   clientX > x + radius - DW / 2 &&
  //   //   clientX < x + radius + DW / 2 &&
  //   //   clientY > y - DW / 2 &&
  //   //   clientY < y + DW / 2
  //   // ) {
  //   //   setPosition(2);
  //   //   last.x = clientX;
  //   //   last.y = clientY;
  //   //   setLast(last);
  //   // } else setPosition(0);
  // };
  // const onMouseEnter = (e: any) => {
  //   Circle.onMouseEnter(e);
  //   // const { clientX, clientY } = e;
  //   // console.log("enter", clientX, clientY);
  // };
  // const onMouseMove = (e: any) => {
  //   // console.log(position)
  //   if (!canvasRef.current) return;
  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;
  //   Circle.onMouseMove(ctx,e,function(e:string):void{
  //     props.onResult(e)
  //   })
  //   // const { clientX, clientY } = e;
  //   // if (position > 0) {
  //   //   let { x, y, radius } = circle;
  //   //   const dx = clientX - last.x;
  //   //   const dy = clientY - last.y;
  //   //   if (position === 1) {
  //   //     x += dx;
  //   //     y += dy;
  //   //     setCircle({ x, y, radius });
  //   //     paint();
  //   //   } else {
  //   //     if (Math.abs(dx) < Math.abs(dy)) radius += dy;
  //   //     else radius += dx;
  //   //     setCircle({ x, y, radius });
  //   //     paint();
  //   //   }
  //   //   setLast({ x: clientX, y: clientY });
  //   // }
  // };
  // const onMouseUp = (e: any) => {
  //   const { clientX, clientY } = e;
  //   // setPosition(0);
  //   Circle.onMouseUp(e);
  //   // console.log("up", clientX, clientY);
  // };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <img
        src="https://jambo2018.github.io/img/top_img.jpeg"
        width={600}
        height={400}
        style={{ position: "absolute", zIndex: "-1" }}
      />
      <Circle onResult={props.onResult}/>
      {/* <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      /> */}
    </div>
  );
};

export default Cropper;
