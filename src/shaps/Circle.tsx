import React, { useEffect, useRef, useState } from "react";
import { getCropPosition } from "./corCaculate"
interface propsType {
  src?: string;
  canvasWidth: number,
  canvasHeight: number,
  onResult: (url: string) => void;
}
type CircleEle = {
  x: number,
  y: number,
  radius: number
}

enum Position {
  out,
  in,
  dot,
}
const circle_curser = ["default", "move", "e-resize"];
const DW: number = 10;



function getInitital(cW: number, cH: number): CircleEle {
  const radius = Math.min(cW * 0.4, cH * 0.4, 200) / 2;
  const x = cW / 2;
  const y = cH / 2;
  return { x, y, radius };
}


const Circle: React.FC<propsType> = (props: propsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { src, canvasWidth, canvasHeight } = props;
  const { x, y, radius } = getInitital(canvasWidth, canvasHeight);
  const [circle, setCircle] = useState({ x, y, radius });
  // const [position, setPosition] = useState(0);
  let pos = useRef<Position>(0);
  const [last, setLast] = useState({ x: 0, y: 0 });
  const press = useRef<boolean>(false);

  const setCursor = (p: Position) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.style.cursor = circle_curser[p];
  };

  // init canvas and paint the background
  useEffect(() => {
    paint();
  }, []);

  function paint() {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y, radius } = circle;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = "#0F0";
    ctx.beginPath();
    ctx.lineTo(0, 0);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, canvasHeight);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(canvasWidth, 0);

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "#F40";
    ctx.fillRect(x + radius - DW / 2, y - DW / 2, DW, DW);

    const cropper: HTMLCanvasElement = document.createElement("canvas");
    cropper.width = radius * 2;
    cropper.height = radius * 2;
    const cropper_ctx = cropper.getContext("2d");
    let img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = src || "";
    img.onload = function () {
      cropper_ctx?.beginPath();
      cropper_ctx?.arc(radius, radius, radius, 0, 2 * Math.PI);
      cropper_ctx?.clip();
      const cropPos: number[] = getCropPosition(canvasWidth, canvasHeight, img.width, img.height, x - radius, y - radius, radius * 2, radius * 2)
      cropper_ctx?.drawImage(img, cropPos[0], cropPos[1], cropPos[2], cropPos[3], 0, 0, radius * 2, radius * 2);
      props.onResult(cropper?.toDataURL("image/png", 1));
    };
  }

  const on_down = function (c: object, e: any) {
    const { x, y, radius } = circle;
    const { offsetX, offsetY } = e.nativeEvent;
    if (
      Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2) <
      Math.pow(radius - DW / 2, 2)
    ) {
      return Position.in;
    } else if (
      offsetX > x + radius - DW / 2 &&
      offsetX < x + radius + DW / 2 &&
      offsetY > y - DW / 2 &&
      offsetY < y + DW / 2
    ) {
      return Position.dot;
    } else {
      return Position.out;
    }
  };
  const onMouseDown = (e: any) => {
    // console.log("down")
    press.current = true;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    pos.current = on_down(circle, e);
    setCursor(pos.current);
    setLast({ x, y });
  };

  const onMouseMove = (e: any) => {
    if (!press.current) {
      let p = on_down(circle, e);
      setCursor(p);
    }
    // console.log("move",pos.current)
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { offsetX, offsetY } = e.nativeEvent;
    if (pos.current > 0) {
      let { x, y, radius } = circle;
      const dx = offsetX - last.x;
      const dy = offsetY - last.y;
      if (pos.current === 1) {
        x += dx;
        y += dy;
      } else {
        if (Math.abs(dx) < Math.abs(dy)) radius += dy;
        else radius += dx;
      }
      if (radius < 10)
        radius = 10
      if (radius > Math.min(canvasWidth, canvasHeight) / 2)
        radius = Math.min(canvasWidth, canvasHeight) / 2
      if (x < radius)
        x = radius
      if (y < radius)
        y = radius
      if (x + radius > canvasWidth)
        x = canvasWidth - radius
      if (y + radius > canvasHeight)
        y = canvasHeight - radius
      setCircle({ x, y, radius });
      paint();
      setLast({ x: offsetX, y: offsetY });
    }
  };
  const onMouseUp = (e: any) => {
    press.current = false;
    pos.current = 0;
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Circle;
