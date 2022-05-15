import {Last,Cors,Rectangle} from "../type";
export enum Position { out, in, top_left, top_right, bottom_right, bottom_left, top, right, bottom, left };
export const rec_curser = ["default", "move", "nw-resize", "ne-resize", "se-resize", "sw-resize", "n-resize", "e-resize", "s-resize", "w-resize"]
export const DW: number = 12;


export function isInArea(n0: number, n1: number, n: number) {
    return n > n0 && n < n1
}

export function on_down(rec: Rectangle, client: Cors, circle?: boolean): number {
    const { x, y, width, height } = rec;
    const { offsetX, offsetY } = client;
    let pos;
    if (
        isInArea(x + DW / 2, x + width - DW / 2, offsetX) && isInArea(y + DW / 2, y + height - DW / 2, offsetY)
    ) {
        if (circle)
            if (Math.pow(offsetX - (x + width / 2), 2) + Math.pow(offsetY - (y + height / 2), 2) < Math.pow((height - DW / 2), 2))
                pos = Position.in;
            else
                pos = Position.out;
        else
            pos = Position.in;
    } else if (
        isInArea(x - DW / 2, x + DW / 2, offsetX) && isInArea(y - DW / 2, y + DW / 2, offsetY)
    ) {
        pos = Position.top_left;
    } else if (
        isInArea(x + width - DW / 2, x + width + DW / 2, offsetX) && isInArea(y - DW / 2, y + DW / 2, offsetY)
    ) {
        pos = Position.top_right;
    } else if (
        isInArea(x + width - DW / 2, x + width + DW / 2, offsetX) && isInArea(y + height - DW / 2, y + height + DW / 2, offsetY)
    ) {
        pos = Position.bottom_right;
    } else if (
        isInArea(x - DW / 2, x + DW / 2, offsetX) && isInArea(y + height - DW / 2, y + height + DW / 2, offsetY)
    ) {
        pos = Position.bottom_left;
    } else if (
        isInArea(x + DW / 2, x + width - DW / 2, offsetX) && isInArea(y - DW / 2, y + DW / 2, offsetY)
    ) {
        pos = Position.top;
    } else if (
        isInArea(x + width - DW / 2, x + width + DW / 2, offsetX) && isInArea(y + DW / 2, y + height - DW / 2, offsetY)
    ) {
        pos = Position.right;
    } else if (
        isInArea(x + DW / 2, x + width - DW / 2, offsetX) && isInArea(y + height - DW / 2, y + height + DW / 2, offsetY)
    ) {
        pos = Position.bottom;
    } else if (
        isInArea(x - DW / 2, x + DW / 2, offsetX) && isInArea(y + DW / 2, y + height - DW / 2, offsetY)
    ) {
        pos = Position.left;
    } else {
        pos = Position.out;
    }
    return pos;
}

export function on_move(rec: Rectangle, client: Cors, last: Last, pos: Position, canvasWidth: number, canvasHeight: number, square?: boolean, circle?: boolean): Rectangle {
    //    console.log(rec,client,last,pos)
    const { offsetX, offsetY } = client;
    let { x, y, width, height } = rec;
    let dx = offsetX - last.x;
    let dy = offsetY - last.y;
    const bx = x + width;
    const by = y + height;
    switch (pos) {
        case Position.in:
            x += dx;
            y += dy;
            break;
        case Position.top_left:
            if (square || circle) break;
            x = offsetX < 0 ? 0 : offsetX;
            y = offsetY < 0 ? 0 : offsetY;
            width = bx - x;
            height = by - y;
            if (width < 30) {
                width = 30;
                x = bx - width;
            }
            if (height < 30) {
                height = 30;
                y = by - height;
            }
            break;
        case Position.top_right:
            if (square || circle) break;
            height -= dy;
            if (height < 30) {
                height = 30;
                y = by - height;
            }
            y = by - height;
            if (y < 0) {
                y = 0;
                height = by - y;
            }
            width += dx;
            if (x + width > canvasWidth) {
                width = canvasWidth - x
            }
            break;
        case Position.bottom_right:
            if (square) {
                if (Math.abs(dx) < Math.abs(dy)) dy = dx;
                else dx = dy;
            }
            width += dx;
            height += dy
            if (width < 30) {
                width = 30;
            }
            if (height < 30) {
                height = 30;
            }
            if (x + width > canvasWidth) {
                width = canvasWidth - x
            }
            if (y + height > canvasHeight) {
                height = canvasHeight - y
            }
            break;
        case Position.bottom_left:
            if (square || circle) break;
            x = offsetX < 0 ? 0 : offsetX;
            width = bx - x
            if (width < 30) {
                width = 30;
                x = bx - width;
            }

            height += dy;
            if (height < 30) {
                height = 30;
                y = by - height;
            }
            if (y + height > canvasHeight) {
                height = canvasHeight - y
            }
            break;
        case Position.top:
            if (square || circle) break;
            y = offsetY < 0 ? 0 : offsetY;
            height = by - y;
            if (height < 30) {
                height = 30;
                y = by - height;
            }
            break;
        case Position.bottom:
            if (square || circle) break;
            height += dy;
            if (height < 30) {
                height = 30;
            }
            if (y + height > canvasHeight) {
                height = canvasHeight - y
            }
            break;
        case Position.right:
            if (square) break;
            width += dx
            if (width < 30) {
                width = 30;
            }
            if (x + width > canvasWidth) {
                width = canvasWidth - x
            }
            if (circle) {
                // circle center
                let cy = y + height / 2;
                if (cy + width / 2 > canvasHeight) {
                    height = (canvasHeight - cy) * 2;
                    width = height;
                } else if (cy - width / 2 < 0) {
                    height = cy * 2;
                    width = height;
                } else {
                    height = width;
                }
                y = cy - height / 2;
            }
            // if (y + height > canvasHeight) {
            //     height = canvasHeight - y
            // }
            break;
        case Position.left:
            if (square || circle) break;
            x = offsetX < 0 ? 0 : offsetX;
            width = bx - x
            if (width < 30) {
                width = 30;
                x = bx - width;
            }
            break;
        default: break;
    }
    if (x < 0) x = 0
    if (y < 0) y = 0
    if (x + width > canvasWidth) x = canvasWidth - width
    if (y + height > canvasHeight) y = canvasHeight - height
    return { x, y, width, height };
}


/**
 * 
 * @param cW canvas.width
 * @param cH canvas.height
 * @param iW img.width
 * @param iH img.height
 * @param x crop.x
 * @param y crop.y
 * @param width crop.width
 * @param height crop.height
 */
export function getCropPosition(cW: number, cH: number, iW: number, iH: number, x: number, y: number, width: number, height: number): number[] {
    let rate;
    if (cW / cH > iW / iH) {
        rate = iH / cH;
        return [(x - (cW - iW / rate) / 2) * rate, y * rate, width * rate, height * rate]
    } else {
        rate = iW / cW;
        return [x * rate, (y - (cH - iH / rate) / 2) * rate, width * rate, height * rate]
    }

}


export function paintArc(ctx: any, x: number, y: number, radius: number) {
    ctx.beginPath();
    ctx.arc(x, y, DW / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath()
}