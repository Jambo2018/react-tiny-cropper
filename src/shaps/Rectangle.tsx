import React, { useEffect, useRef, useState } from "react";
import { Position, DW, on_rectagle_down, on_rectagle_move } from "./corCaculate";
interface propsType {
    src?: string,
    square?: boolean,
    onResult: (url: string) => void
}


const Rectangle: React.FC<propsType> = (props: propsType) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const src = props.src;
    const [rec, setRec] = useState({ x: 100, y: 100, width: 100, height: 100 });
    let pos = useRef<Position>(0);
    const [last, setLast] = useState({ x: 0, y: 0 });

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.setLineDash([0])
        ctx.strokeStyle = "#0F0"
        ctx.rect(x, y, width, height);
        ctx.stroke();

        ctx.beginPath()
        ctx.setLineDash([5])
        ctx.moveTo(x + width / 3, y)
        ctx.lineTo(x + width / 3, y + height)

        ctx.moveTo(x + width / 3, y)
        ctx.lineTo(x + width / 3, y + height)

        ctx.moveTo(x + width * 2 / 3, y)
        ctx.lineTo(x + width * 2 / 3, y + height)

        ctx.moveTo(x, y + height / 3)
        ctx.lineTo(x + width, y + height / 3)

        ctx.moveTo(x, y + height * 2 / 3)
        ctx.lineTo(x + width, y + height * 2 / 3)

        ctx.stroke();

        ctx.fillStyle = "#F40";
        ctx.fillRect(x - DW / 2, y - DW / 2, DW, DW);
        ctx.fillRect(x + width - DW / 2, y - DW / 2, DW, DW);
        ctx.fillRect(x - DW / 2, y + height - DW / 2, DW, DW);
        ctx.fillRect(x + width - DW / 2, y + height - DW / 2, DW, DW);
        ctx.fillRect(x + width / 2 - DW / 2, y - DW / 2, DW, DW);
        ctx.fillRect(x + width / 2 - DW / 2, y + height - DW / 2, DW, DW);
        ctx.fillRect(x - DW / 2, y + height / 2 - DW / 2, DW, DW);
        ctx.fillRect(x + width - DW / 2, y + height / 2 - DW / 2, DW, DW);
        ctx.closePath();


        const cropper: HTMLCanvasElement = document.createElement("canvas");
        cropper.width = width
        cropper.height = height
        const cropper_ctx = cropper.getContext("2d");
        let img = new Image();
        img.setAttribute("crossOrigin", 'anonymous')
        img.src = src || "";
        img.onload = function () {
            const mW = 600 / img.width;
            const mH = 400 / img.height;
            cropper_ctx?.drawImage(img, x / mW, y / mH, width / mW, height / mH, 0, 0, width, height)
            props.onResult(cropper?.toDataURL())
        }
    }
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.style.cursor = "pointer"
        if (!pos) return;
        // const ctx = canvas.getContext("2d");
        switch (pos?.current) {
            case Position.in:
                canvas.style.cursor = "move";
                break;
            case Position.out:
                canvas.style.cursor = "pointer";
                break;
            default:
                canvas.style.cursor = "auto";
                break;
        }
    }, [pos.current])
    function isInArea(n0: number, n1: number, n: number) {
        return n > n0 && n < n1
    }
    const onMouseDown = (e: any) => {
        // console.log("down")
        const { clientX: x, clientY: y } = e;
        pos.current = on_rectagle_down(rec, e);
        setLast({ x, y });
    };
    const onMouseEnter = (e: any) => {
        // console.log("enter")
        const { clientX, clientY } = e;
    };
    const onMouseMove = (e: any) => {
        if (pos.current === Position.out) return;
        const { x, y, width, height } = on_rectagle_move(rec, e, last, pos.current);
        setLast({ x: e.clientX, y: e.clientY });
        setRec({ x, y, width, height });
        paint();
    };
    const onMouseUp = (e: any) => {
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

export default Rectangle;
