import React, { useEffect, useRef, useState } from "react";



interface propsType {
    src?: string,
    onResult: (url: string) => void
}

type Cors = {
    clientX: number,
    clientY: number
}
enum Position { out, in, dot };
const circle_curser = ["default", "move", "e-resize"]
const DW: number = 10;
const Circle: React.FC<propsType> = (props: propsType) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const src = props.src;
    const [circle, setCircle] = useState({ x: 100, y: 100, radius: 50 });
    // const [position, setPosition] = useState(0);
    let pos = useRef<Position>(0);
    const [last, setLast] = useState({ x: 0, y: 0 });
    const press = useRef<boolean>(false);

    const setCursor = (p: Position) => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.style.cursor = circle_curser[p]
    }


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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.lineTo(0,0)
ctx.arc(x,y,radius,-Math.PI, 0)
ctx.moveTo(x+radius,y)
ctx.lineTo(canvas.width,0)
ctx.lineTo(0,0)
ctx.moveTo(canvas.width,0)
ctx.lineTo(x+radius,y)
ctx.arc(x,y,radius,0,Math.PI)
ctx.lineTo(0,0)
ctx.lineTo(0,canvas.height)
ctx.lineTo(canvas.width,canvas.height)
ctx.lineTo(canvas.width,0)


ctx.fillStyle="rgba(0,0,0,0.5)"
ctx.fill()
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "#F40";
        ctx.fillRect(x + radius - DW / 2, y - DW / 2, DW, DW);

        const cropper: HTMLCanvasElement = document.createElement("canvas");
        cropper.width = radius * 2
        cropper.height = radius * 2
        const cropper_ctx = cropper.getContext("2d");
        let img = new Image();
        img.setAttribute("crossOrigin", 'anonymous')
        img.src = src || "";
        img.onload = function () {
            cropper_ctx?.beginPath();
            cropper_ctx?.arc(radius, radius, radius, 0, 2 * Math.PI);
            cropper_ctx?.clip();
            const mW = 600 / img.width;
            const mH = 400 / img.height;
            cropper_ctx?.drawImage(img, (x - radius) / mW, (y - radius) / mH, radius * 2 / mW, radius * 2 / mH, 0, 0, radius * 2, radius * 2)
            props.onResult(cropper?.toDataURL())
        }
    }

    const on_down = function (c: object, e: Cors) {
        const { x, y, radius } = circle;
        const { clientX, clientY } = e;
        if (
            Math.pow(clientX - x, 2) + Math.pow(clientY - y, 2) <
            Math.pow(radius - DW / 2, 2)
        ) {
            return Position.in;
        } else if (
            clientX > x + radius - DW / 2 &&
            clientX < x + radius + DW / 2 &&
            clientY > y - DW / 2 &&
            clientY < y + DW / 2
        ) {
            return Position.dot;
        } else {
            return Position.out;
        }
    }
    const onMouseDown = (e: any) => {
        // console.log("down")
        press.current = true;
        const { clientX: x, clientY: y } = e;
        pos.current = on_down(circle, e);
        setCursor(pos.current);
        setLast({ x, y });
    };
    const onMouseEnter = (e: any) => {
        // console.log("enter")
        const { clientX, clientY } = e;
    };
    const onMouseMove = (e: any) => {
        if (!press.current) {
            let p = on_down(circle, e);
            setCursor(p)
        }
        // console.log("move",pos.current)
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { clientX, clientY } = e;
        if (pos.current > 0) {
            let { x, y, radius } = circle;
            const dx = clientX - last.x;
            const dy = clientY - last.y;
            if (pos.current === 1) {
                x += dx;
                y += dy;
                setCircle({ x, y, radius });
                paint();
            } else {
                if (Math.abs(dx) < Math.abs(dy)) radius += dy;
                else radius += dx;
                setCircle({ x, y, radius });
                paint();
            }
            setLast({ x: clientX, y: clientY });
        }
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

export default Circle;
