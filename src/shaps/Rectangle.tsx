import React, { useEffect, useRef, useState } from "react";
interface propsType {
    src?: string,
    onResult: (url: string) => void
}

enum Position { out, in, top_left, top_right, bottom_right, bottom_left, top, right, bottom, left };

const DW: number = 10;
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
        const { x, y, width, height } = rec;
        const { clientX, clientY } = e;
        if (
            isInArea(x + DW / 2, x + width - DW / 2, clientX) && isInArea(y + DW / 2, y + height - DW / 2, clientY)
        ) {
            pos.current = Position.in;
        } else if (
            isInArea(x - DW / 2, x + DW / 2, clientX) && isInArea(y - DW / 2, y + DW / 2, clientY)
        ) {
            pos.current = Position.top_left;
        } else if (
            isInArea(x + width - DW / 2, x + width + DW / 2, clientX) && isInArea(y - DW / 2, y + DW / 2, clientY)
        ) {
            pos.current = Position.top_right;
        } else if (
            isInArea(x + width - DW / 2, x + width + DW / 2, clientX) && isInArea(y + height - DW / 2, y + height + DW / 2, clientY)
        ) {
            pos.current = Position.bottom_right;
        } else if (
            isInArea(x - DW / 2, x + DW / 2, clientX) && isInArea(y + height - DW / 2, y + height + DW / 2, clientY)
        ) {
            pos.current = Position.bottom_left;
        } else if (
            isInArea(x + DW / 2, x + width - DW / 2, clientX) && isInArea(y - DW / 2, y + DW / 2, clientY)
        ) {
            pos.current = Position.top;
        } else if (
            isInArea(x + width - DW / 2, x + width + DW / 2, clientX) && isInArea(y + DW / 2, y + height - DW / 2, clientY)
        ) {
            pos.current = Position.right;
        } else if (
            isInArea(x + DW / 2, x + width - DW / 2, clientX) && isInArea(y + height - DW / 2, y + height + DW / 2, clientY)
        ) {
            pos.current = Position.bottom;
        } else if (
            isInArea(x - DW / 2, x + DW / 2, clientX) && isInArea(y + DW / 2, y + height - DW / 2, clientY)
        ) {
            pos.current = Position.left;
        } else {
            pos.current = Position.out;
        }
        setLast({ x: clientX, y: clientY });
    };
    const onMouseEnter = (e: any) => {
        // console.log("enter")
        const { clientX, clientY } = e;
    };
    const onMouseMove = (e: any) => {
        // console.log("move",pos.current)
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { clientX, clientY } = e;
        if (pos.current === Position.out) return;
        let { x, y, width, height } = rec;
        const dx = clientX - last.x;
        const dy = clientY - last.y;
        const bx = x + width;
        const by = y + height;
        switch (pos.current) {
            case Position.in:
                x += dx;
                y += dy;
                break;
            case Position.top_left:
                x = clientX;
                y = clientY;
                width = bx - x;
                height = by - y;
                break;
            case Position.top_right:
                height -= dy;
                y = by - height;
                width += dx;
                break;
            case Position.bottom_right:
                width += dx;
                height += dy
                break;
            case Position.bottom_left:
                x = clientX;
                width = bx - x
                height += dy;
                break;
            case Position.top:
                y = clientY;
                height = by - y;
                break;
            case Position.bottom:
                height += dy;
                break;
            case Position.right:
                width += dx
                break;
            case Position.left:
                x = clientX;
                width = bx - x
                break;
            default: break;
        }
        console.log(x, y, width, height)
        setLast({ x: clientX, y: clientY });
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
