export enum Position { out, in, top_left, top_right, bottom_right, bottom_left, top, right, bottom, left };
export const rec_curser = ["default", "move", "se-resize", "sw-resize", "se-resize", "ne-resize", "n-resize", "e-resize", "n-resize", "e-resize"]
export const square_curser = ["default", "move", "default", "default", "se-resize", "default", "default", "default", "default", "default"]
export const DW: number = 10;
export type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number
}
type Cors = {
    offsetX: number,
    offsetY: number
}
type Last = {
    x: number,
    y: number
}
export function isInArea(n0: number, n1: number, n: number) {
    return n > n0 && n < n1
}

export function on_down(rec: Rectangle, client: Cors): number {
    const { x, y, width, height } = rec;
    const { offsetX, offsetY } = client;
    let pos;
    if (
        isInArea(x + DW / 2, x + width - DW / 2, offsetX) && isInArea(y + DW / 2, y + height - DW / 2, offsetY)
    ) {
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

export function on_move(rec: Rectangle, client: Cors, last: Last, pos: Position, square?: boolean): Rectangle {
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
            if (square) break;
            x = offsetX;
            y = offsetY;
            width = bx - x;
            height = by - y;
            break;
        case Position.top_right:
            if (square) break;
            height -= dy;
            y = by - height;
            width += dx;
            break;
        case Position.bottom_right:
            if (square) {
                if (Math.abs(dx) < Math.abs(dy)) dy = dx;
                else dx = dy;
            }
            width += dx;
            height += dy
            break;
        case Position.bottom_left:
            if (square) break;
            x = offsetX;
            width = bx - x
            height += dy;
            break;
        case Position.top:
            if (square) break;
            y = offsetY;
            height = by - y;
            break;
        case Position.bottom:
            if (square) break;
            height += dy;
            break;
        case Position.right:
            if (square) break;
            width += dx
            break;
        case Position.left:
            if (square) break;
            x = offsetX;
            width = bx - x
            break;
        default: break;
    }

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
export function getCropPosition(cW: number, cH: number, iW: number, iH: number,x:number,y:number,width:number,height:number): number[] {
    let rate;
    if (cW / cH > iW / iH) {
        rate = iH / cH;
        return [(x-(cW - iW/rate)/2)*rate,y*rate,width*rate,height*rate]
    }else{
        rate = iW / cW;
        return [x*rate,(y-(cH-iH/rate)/2)*rate,width*rate,height*rate]
    }

}