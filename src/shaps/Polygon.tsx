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
        let angel;
        if (props.dots % 2 === 1) {
            angel = (i / props.dots) * 2 * Math.PI - Math.PI / 2;
        } else {
            angel = ((i + 0.5) / props.dots) * 2 * Math.PI;
        }
        let cos = (Math.cos(angel)).toFixed(3);
        let sin = (Math.sin(angel)).toFixed(3);
        a.push({ x: 150 + 100 * parseFloat(cos), y: 150 + 100 * parseFloat(sin) })
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


        const cropper: HTMLCanvasElement = document.createElement("canvas");
        let x_max: number = 0, x_min: number = canvas.width, y_max: number = 0, y_min: number = canvas.height;
        polygon.forEach(item => {
            x_max = Math.max(x_max, item.x)
            x_min = Math.min(x_min, item.x)
            y_max = Math.max(y_max, item.y)
            y_min = Math.min(y_min, item.y)
        })
        console.log(x_min, y_min,x_max, y_max)
        cropper.width = x_max - x_min;
        cropper.height = y_max - y_min;
        const cropper_ctx = cropper.getContext("2d");
        let img = new Image();
        img.setAttribute("crossOrigin", 'anonymous')
        img.src = src || "";
        img.onload = function () {
            cropper_ctx?.beginPath();
            cropper_ctx?.fillRect(0,0,canvas.width,canvas.height);
            cropper_ctx?.moveTo(polygon[0].x, polygon[0].y);
            polygon.forEach(item => {
                cropper_ctx?.lineTo(item.x, item.y);
            })
            // cropper_ctx?.lineTo(polygon[0].x, polygon[0].y);
            // cropper_ctx?.closePath();
            cropper_ctx?.clip();
            const mW = 600 / img.width;
            const mH = 400 / img.height;
            cropper_ctx?.drawImage(img, x_min / mW, y_min / mH, cropper.width / mW, cropper.height / mH, 0, 0, cropper.width, cropper.height)
            props.onResult(cropper?.toDataURL())
        }
    }

    const setCursor = (p: number) => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        if (p === props.dots)
            canvas.style.cursor = "default"
        else
            canvas.style.cursor = "move"
    }
    function isInArea(n0: number, n1: number, n: number) {
        return n > n0 && n < n1
    }

    function on_down(polygon: Cors[], e: Cors): number {
        for (let i = 0; i < props.dots; i++) {
            if (
                isInArea(polygon[i].x - DW / 2, polygon[i].x + DW / 2, e.x) && isInArea(polygon[i].y - DW / 2, polygon[i].y + DW / 2, e.y)
            ) {
                return i;
            }
        }
        return props.dots;
    }

    const onMouseDown = (e: any) => {
        // console.log("down")
        press.current = true;
        const { clientX: x, clientY: y } = e;
        pos.current = on_down(polygon, { x, y });
        setCursor(pos.current);
        setLast({ x, y });
    };
    const onMouseEnter = (e: any) => {
        // console.log("enter")
        const { clientX, clientY } = e;
    };
    const onMouseMove = (e: any) => {
        const { clientX: x, clientY: y } = e;
        if (!press.current) {
            let p = on_down(polygon, { x, y });
            setCursor(p)
        }
        if (pos.current === props.dots)
            return;
        polygon[pos.current] = { x, y };
        setPolygon(polygon);
        paint();
    };
    const onMouseUp = (e: any) => {
        press.current = false;
        pos.current = props.dots;
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
