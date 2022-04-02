import React, { useEffect, useRef, useState } from "react";
import { Position, DW, on_down, on_move, rec_curser, square_curser } from "./corCaculate";
interface propsType {
    src?: string,
    dots: number,
    square?: boolean,
    onResult: (url: string) => void
}
type Cors = {
    x: number, y: number
}
const Polygon: React.FC<propsType> = (props: propsType) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const src = props.src;

    let a = [];
    for (let i = 0; i < props.dots; i++) {
        console.log(Math.round(Math.cos((i / props.dots) * 2 * Math.PI)), Math.round(Math.sin((i / props.dots) * 2 * Math.PI)))
        let angel;
        if(props.dots%2===1){
            angel = (i / props.dots) * 2 * Math.PI - Math.PI / 2;
        }else{
            angel = ((i+0.5) / props.dots) * 2 * Math.PI ;
        }
        let cos = (Math.cos(angel)).toFixed(3);
        let sin = (Math.sin(angel)).toFixed(3);
        a.push({ x: 150 + 100 * parseFloat(cos), y: 150 + 100 * parseFloat(sin) })
    }


    const [polygon, setPolygon] = useState<Cors[]>(a);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#0F0"
        ctx.fillStyle = "#F40";
        ctx.beginPath()
        for (let i = 0; i < props.dots; i++) {
            ctx.setLineDash([5])
            ctx.lineTo(polygon[i].x, polygon[i].y);
            ctx.fillRect(polygon[i].x - DW / 2, polygon[i].y - DW / 2, DW, DW);
        }
        ctx.lineTo(polygon[0].x, polygon[0].y);

        ctx.stroke();
        ctx.closePath();


        // const cropper: HTMLCanvasElement = document.createElement("canvas");
        // cropper.width = width
        // cropper.height = height
        // const cropper_ctx = cropper.getContext("2d");
        // let img = new Image();
        // img.setAttribute("crossOrigin", 'anonymous')
        // img.src = src || "";
        // img.onload = function () {
        //     const mW = 600 / img.width;
        //     const mH = 400 / img.height;
        //     cropper_ctx?.drawImage(img, x / mW, y / mH, width / mW, height / mH, 0, 0, width, height)
        //     props.onResult(cropper?.toDataURL())
        // }
    }

    const setCursor = (p: Position) => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        if (props.square)
            canvas.style.cursor = square_curser[p]
        else
            canvas.style.cursor = rec_curser[p]
    }

    const onMouseDown = (e: any) => {
        // console.log("down")
        press.current = true;
        const { clientX: x, clientY: y } = e;
        // pos.current = on_down(rec, e);
        setCursor(pos.current);
        setLast({ x, y });
    };
    const onMouseEnter = (e: any) => {
        // console.log("enter")
        const { clientX, clientY } = e;
    };
    const onMouseMove = (e: any) => {
        // if (!press.current) {
        //     let p = on_down(rec, e);
        //     setCursor(p)
        // }
        // if (pos.current === Position.out)
        //     return;
        // const { x, y, width, height } = on_move(rec, e, last, pos.current, props.square);
        // setLast({ x: e.clientX, y: e.clientY });
        // setRec({ x, y, width, height });
        paint();
    };
    const onMouseUp = (e: any) => {
        press.current = false;
        pos.current = 0;
    };

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        />
    );
};

export default Polygon;
