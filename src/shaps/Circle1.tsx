import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Position,
  DW,
  on_down,
  on_move,
  rec_curser,
  // square_curser,
  getCropPosition,
  Rectangle,
} from "./corCaculate";
interface propsType {
  src?: string;
  square?: boolean;
  circle?: boolean;
  canvasWidth: number;
  canvasHeight: number;
  onResult: (url: string) => void;
}

function getInitital(
  cW: number,
  cH: number,
  square: boolean,
  circle: boolean
): Rectangle {
  let width = Math.min(200, cW * 0.4);
  let height = Math.min(200, cH * 0.4);
  if (square || circle) {
    width = Math.min(width, height);
    height = width;
  }
  const x = (cW - width) / 2;
  const y = (cH - height) / 2;
  // console.log("###########",x,y,width,height)
  return { x, y, width, height };
}
const RecCom: React.FC<propsType> = (props: propsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    src,
    canvasWidth,
    canvasHeight,
    square = false,
    circle = false,
  } = props;

  const [rec, setRec] = useState(
    getInitital(canvasWidth, canvasHeight, square, circle)
  );
  const [last, setLast] = useState({ x: 0, y: 0 });
  const pos = useRef<Position>(0);
  const press = useRef<boolean>(false);

  function paint() {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y, width, height } = rec;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.strokeStyle = "#0F0";

    if (circle) {
      ctx.beginPath();
      ctx.lineTo(0, 0);
      ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, canvasHeight);
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(canvasWidth, 0);

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.clearRect(x, y, width, height);

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
    }
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "#F40";
    if (circle) {
      // right-middle
      ctx.fillRect(x + width - DW / 2, y + height / 2 - DW / 2, DW, DW);
    } else if (square) {
      // right-bottom
      ctx.fillRect(x + width - DW / 2, y + height - DW / 2, DW, DW);
    } else {
      ctx.fillRect(x - DW / 2, y - DW / 2, DW, DW);
      ctx.fillRect(x + width - DW / 2, y - DW / 2, DW, DW);
      ctx.fillRect(x - DW / 2, y + height - DW / 2, DW, DW);
      ctx.fillRect(x + width / 2 - DW / 2, y - DW / 2, DW, DW);
      ctx.fillRect(x - DW / 2, y + height / 2 - DW / 2, DW, DW);
      ctx.fillRect(x + width / 2 - DW / 2, y + height - DW / 2, DW, DW);
      ctx.fillRect(x + width - DW / 2, y + height / 2 - DW / 2, DW, DW);
      ctx.fillRect(x + width - DW / 2, y + height - DW / 2, DW, DW);
    }
    ctx.closePath();

    const cropper: HTMLCanvasElement = document.createElement("canvas");
    cropper.width = width;
    cropper.height = height;
    const cropper_ctx = cropper.getContext("2d");
    let img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = src || "";
    // console.log(width, height);
    img.onload = function () {
      if (circle) {
        cropper_ctx?.beginPath();
        cropper_ctx?.arc(width / 2, width / 2, width / 2, 0, 2 * Math.PI);
        cropper_ctx?.clip();
      }
      const cropPos: number[] = getCropPosition(
        canvasWidth,
        canvasHeight,
        img.width,
        img.height,
        x,
        y,
        width,
        height
      );
      cropper_ctx?.drawImage(
        img,
        cropPos[0],
        cropPos[1],
        cropPos[2],
        cropPos[3],
        0,
        0,
        width,
        height
      );
      props.onResult(cropper?.toDataURL("image/png", 1));
    };
  }

  const setCursor = (p: Position) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    let cursor_style;
    if (square)
      if (p === Position.in||p === Position.bottom_right) cursor_style = rec_curser[p];
      else cursor_style = "default";
    else if (circle)
      if (p === Position.in||p === Position.right) cursor_style = rec_curser[p];
      else cursor_style = "default";
    else cursor_style = rec_curser[p];
    canvas.style.cursor = cursor_style;
  };

  const onMouseDown = (e: any) => {
    // console.log("down")
    press.current = true;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    pos.current = on_down(rec, e.nativeEvent,circle);
    setCursor(pos.current);
    setLast({ x, y });
  };

  const onMouseMove = useCallback(
    (e: any) => {
      if (!canvasRef.current) return;
      const canvas: HTMLCanvasElement = canvasRef.current;

      // console.log(e.clientX,e.clientY)

      // let { offsetX: x, offsetY: y } = e.nativeEvent;
      // console.log(x,y)
      const rect: DOMRectList = canvas.getClientRects();
      let offsetX = e.clientX - rect[0].x;
      let offsetY = e.clientY - rect[0].y;

      if (!press.current) {
        // console.log(rec)
        let p = on_down(rec, { offsetX, offsetY },circle);
        setCursor(p);
      }
      if (pos.current === Position.out) return;
      let { x, y, width, height } = on_move(
        rec,
        { offsetX, offsetY },
        last,
        pos.current,
        canvasWidth,
        canvasHeight,
        square,
        circle
      );

      setLast({ x: offsetX, y: offsetY });
      setRec({ x, y, width, height });
      paint();
    },
    [last, rec]
  );
  const onMouseUp = useCallback((_e: any) => {
    press.current = false;
    pos.current = 0;
  }, []);
  useEffect(() => {
    paint();
  }, []);
  // init canvas and paint the background
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={onMouseDown}
    />
  );
};

export default RecCom;
