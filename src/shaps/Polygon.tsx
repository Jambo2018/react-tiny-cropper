import React, { useEffect, useRef, useState } from "react";
import {DW,getCropPosition} from "./corCaculate";
interface propsType {
  src?: string;
  dots: number;
  canvasWidth:number,
  canvasHeight:number,
  onResult: (url: string) => void;
}
type Cors = {
  x: number;
  y: number;
};
const Polygon: React.FC<propsType> = (props: propsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {src,canvasWidth,canvasHeight} = props;

  let a = [];
  for (let i = 0; i < props.dots; i++) {
    let angel;
    if (props.dots % 2 === 1) {
      angel = (i / props.dots) * 2 * Math.PI - Math.PI / 2;
    } else {
      angel = ((i + 0.5) / props.dots) * 2 * Math.PI;
    }
    let cos = Math.cos(angel).toFixed(3);
    let sin = Math.sin(angel).toFixed(3);
    a.push({ x: 150 + 100 * parseFloat(cos), y: 150 + 100 * parseFloat(sin) });
  }

  const [polygon, setPolygon] = useState<Cors[]>(a);
  const [last, setLast] = useState({ x: 0, y: 0 });
  const pos = useRef<number>(props.dots);
  const press = useRef<boolean>(false);

  // init canvas and paint the background
  useEffect(() => {
    paint();
  }, []);

  function paint() {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath();
    ctx.lineTo(0, 0);
    for (let i = 0; i < props.dots; i++) {
      ctx.lineTo(polygon[i].x, polygon[i].y);
    }
    ctx.lineTo(polygon[0].x, polygon[0].y);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, canvasHeight);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(canvasWidth, 0);

    ctx.fill();

    ctx.strokeStyle = "#0F0";
    ctx.fillStyle = "#F40";
    ctx.beginPath();
    for (let i = 0; i < props.dots; i++) {
      ctx.setLineDash([5]);
      ctx.lineTo(polygon[i].x, polygon[i].y);
      ctx.fillRect(polygon[i].x - DW / 2, polygon[i].y - DW / 2, DW, DW);
    }
    ctx.lineTo(polygon[0].x, polygon[0].y);

    ctx.stroke();
    ctx.closePath();

    const cropper: HTMLCanvasElement = document.createElement("canvas");
    let x_max: number = 0,
      x_min: number = canvasWidth,
      y_max: number = 0,
      y_min: number = canvasHeight;
    polygon.forEach((item) => {
      x_max = Math.max(x_max, item.x);
      x_min = Math.min(x_min, item.x);
      y_max = Math.max(y_max, item.y);
      y_min = Math.min(y_min, item.y);
    });
    cropper.width = x_max - x_min;
    cropper.height = y_max - y_min;
    const cropper_ctx = cropper.getContext("2d");
    let img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = src || "";
    img.onload = function () {
      cropper_ctx?.beginPath();
      polygon.forEach((item) => {
        cropper_ctx?.lineTo(item.x - x_min, item.y - y_min);
      });
      cropper_ctx?.lineTo(polygon[0].x - x_min, polygon[0].y - y_min);
      cropper_ctx?.clip();
      const cropPos: number[] = getCropPosition(canvasWidth, canvasHeight, img.width, img.height, x_min, y_min, cropper.width, cropper.height)
      cropper_ctx?.drawImage(img, cropPos[0], cropPos[1], cropPos[2], cropPos[3], 0, 0, cropper.width, cropper.height);
      props.onResult(cropper?.toDataURL());
    };
  }

  const setCursor = (p: number) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    if (p === props.dots) canvas.style.cursor = "default";
    else canvas.style.cursor = "move";
  };
  function isInArea(n0: number, n1: number, n: number) {
    return n > n0 && n < n1;
  }

  function on_down(polygon: Cors[], e: Cors): number {
    for (let i = 0; i < props.dots; i++) {
      if (
        isInArea(polygon[i].x - DW / 2, polygon[i].x + DW / 2, e.x) &&
        isInArea(polygon[i].y - DW / 2, polygon[i].y + DW / 2, e.y)
      ) {
        return i;
      }
    }
    return props.dots;
  }

  const onMouseDown = (e: any) => {
    // console.log("down")
    press.current = true;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    pos.current = on_down(polygon, { x, y });
    setCursor(pos.current);
    setLast({ x, y });
  };
  const onMouseEnter = (e: any) => {
    // console.log("enter")
    const { offsetX, offsetY } = e.nativeEvent;
  };
  const onMouseMove = (e: any) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    let { offsetX: x, offsetY: y } = e.nativeEvent;
    if (!press.current) {
      let p = on_down(polygon, { x, y });
      setCursor(p);
    }
    if (pos.current === props.dots) return;

    if (x < 0)
      x = 0
    if (y < 0)
      y = 0
    if (x > canvasWidth)
      x = canvasWidth
    if (y > canvasHeight)
      y = canvasHeight
    polygon[pos.current] = { x, y };
    setPolygon(polygon);
    paint();
  };
  const onMouseUp = (e: any) => {
    press.current = false;
    pos.current = props.dots;
  };
  console.log(canvasWidth)

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Polygon;
