type Cors = { x: number, y: number };
type Circle = { x: number, y: number, radius: number };
enum Positon { out, in, dot };
const DW: number = 10;
let pos: Positon = 0;
let last: Cors = { x: 0, y: 0 }
let circle: Circle = { x: 20, y: 20, radius: 50 }
export let canvas_width: number, canvas_height: number;
export function init(ctx: any,width:number,height:number): void {
    // if (!canvasRef.current) return;
    // const canvas: HTMLCanvasElement = canvasRef.current;
    // const ctx = canvas.getContext("2d");
    // if (!ctx) return;
    canvas_width=width;
    canvas_height=height;
    ctx.fillStyle = "#F40";
    // ctx.beginPath();
    // ctx.strokeStyle="#F40"
    // ctx.arcTo(100,100,100,100,100);
    // ctx.stroke()
    const { x, y, radius } = circle;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillRect(x + radius - DW / 2, y - DW / 2, DW, DW);
    ctx.closePath();
}
export function paint(ctx: any, result: (url: string) => void): void {
    const { x, y, radius } = circle;
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillRect(x + radius - DW / 2, y - DW / 2, DW, DW);

    const cropper: HTMLCanvasElement = document.createElement("canvas");
    cropper.width = radius * 2
    cropper.height = radius * 2
    const cropper_ctx = cropper.getContext("2d");
    let img = new Image();
    img.setAttribute("crossOrigin", 'anonymous')
    img.src = "https://jambo2018.github.io/img/top_img.jpeg"
    img.onload = function () {
        cropper_ctx?.beginPath();
        cropper_ctx?.arc(radius, radius, radius, 0, 2 * Math.PI);
        cropper_ctx?.clip();
        const mW = 600 / img.width;
        const mH = 400 / img.height;
        cropper_ctx?.drawImage(img, (x - radius) / mW, (y - radius) / mH, radius * 2 / mW, radius * 2 / mH, 0, 0, radius * 2, radius * 2)
        result(cropper?.toDataURL())
    }
}






export function onMouseDown(e: any): void {
    // console.log("down",last)
    const { x, y, radius } = circle;
    const { clientX, clientY } = e;
    let last = { x, y };
    if (
        Math.pow(clientX - x, 2) + Math.pow(clientY - y, 2) <
        Math.pow(radius - DW / 2, 2)
    ) {
        pos = 1;
        last = { x: clientX, y: clientY };
    } else if (
        clientX > x + radius - DW / 2 &&
        clientX < x + radius + DW / 2 &&
        clientY > y - DW / 2 &&
        clientY < y + DW / 2
    ) {
        pos = 2;
        last = { x: clientX, y: clientY };
    } else {
        pos = 0
    };
};
export function onMouseEnter(e: any): void {
    const { clientX, clientY } = e;
    console.log("enter", clientX, clientY);
};
export function onMouseMove(ctx:any,e: any,result:(url:string)=>void): void {
    // console.log(position)
    const { clientX, clientY } = e;
    if (pos > 0) {
        let { x, y, radius } = circle;
        const dx = clientX - last.x;
        const dy = clientY - last.y;
        if (pos === 1) {
            x += dx;
            y += dy;
            circle = { x, y, radius }
            paint(ctx,result);
        } else {
            if (Math.abs(dx) < Math.abs(dy)) radius += dy;
            else radius += dx;
            circle = { x, y, radius };
            paint(ctx,result);
        }
        last = { x: clientX, y: clientY };
    }
};
export function onMouseUp(e: any): void {
    // const { clientX, clientY } = e;
    pos = 0;
    // console.log("up", clientX, clientY);
};

