import React, { useEffect, useRef, useState } from "react";
import {
  Position,
  DW,
  on_down,
  on_move,
  rec_curser,
  square_curser,
} from "./corCaculate";
interface propsType {
  src?: string;
  square?: boolean;
  canvasWidth:number,
  canvasHeight:number,
  onResult: (url: string) => void;
}

const Rectangle: React.FC<propsType> = (props: propsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {src,canvasWidth,canvasHeight} = props;
  const [rec, setRec] = useState({ x: 100, y: 100, width: 100, height: 100 });
  const [last, setLast] = useState({ x: 0, y: 0 });
  const pos = useRef<Position>(0);
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
    const { x, y, width, height } = rec;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.clearRect(x, y, width, height);

    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.strokeStyle = "#0F0";
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(x + width / 3, y);
    ctx.lineTo(x + width / 3, y + height);

    ctx.moveTo(x + width / 3, y);
    ctx.lineTo(x + width / 3, y + height);

    ctx.moveTo(x + (width * 2) / 3, y);
    ctx.lineTo(x + (width * 2) / 3, y + height);

    ctx.moveTo(x, y + height / 3);
    ctx.lineTo(x + width, y + height / 3);

    ctx.moveTo(x, y + (height * 2) / 3);
    ctx.lineTo(x + width, y + (height * 2) / 3);

    ctx.stroke();

    ctx.fillStyle = "#F40";
    if (!props.square) {
      ctx.fillRect(x - DW / 2, y - DW / 2, DW, DW);
      ctx.fillRect(x + width - DW / 2, y - DW / 2, DW, DW);
      ctx.fillRect(x - DW / 2, y + height - DW / 2, DW, DW);
      ctx.fillRect(x + width / 2 - DW / 2, y - DW / 2, DW, DW);
      ctx.fillRect(x - DW / 2, y + height / 2 - DW / 2, DW, DW);
      ctx.fillRect(x + width / 2 - DW / 2, y + height - DW / 2, DW, DW);
      ctx.fillRect(x + width - DW / 2, y + height / 2 - DW / 2, DW, DW);
    }
    ctx.fillRect(x + width - DW / 2, y + height - DW / 2, DW, DW);
    ctx.closePath();

    const cropper: HTMLCanvasElement = document.createElement("canvas");
    cropper.width = width;
    cropper.height = height;
    const cropper_ctx = cropper.getContext("2d");
    let img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = src || "";
    img.onload = function () {
      const mW = canvasWidth / img.width;
      const mH = canvasHeight / img.height;
      cropper_ctx?.drawImage(
        img,
        x / mW,
        y / mH,
        width / mW,
        height / mH,
        0,
        0,
        width,
        height
      );
      props.onResult(cropper?.toDataURL());
    };
  }

  const setCursor = (p: Position) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    if (props.square) canvas.style.cursor = square_curser[p];
    else canvas.style.cursor = rec_curser[p];
  };

  const onMouseDown = (e: any) => {
    // console.log("down")
    press.current = true;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    pos.current = on_down(rec, e.nativeEvent);
    console.log(pos.current)
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
    if (!press.current) {
      let p = on_down(rec, e.nativeEvent);
      setCursor(p);
    }
    if (pos.current === Position.out) return;
    let { x, y, width, height } = on_move(
      rec,
      e.nativeEvent,
      last,
      pos.current,
      props.square
    );
    
    if(width<15)width=15
    if(height<15)height=15
    if(x<0)x=0
    if(y<0)y=0
    if(x+width>canvasWidth)x=canvasWidth-width
    if(y+height>canvasHeight)y=canvasHeight-height

    setLast({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setRec({ x, y, width, height });
    paint();
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
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Rectangle;
