export enum Position { out, in, top_left, top_right, bottom_right, bottom_left, top, right, bottom, left };
export const DW: number = 10;
type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number
}
type Cors = {
    clientX: number,
    clientY: number
}
type Last = {
    x: number,
    y: number
}
export function isInArea(n0: number, n1: number, n: number) {
    return n > n0 && n < n1
}

export function on_rectagle_down(rec: Rectangle, client: Cors): number {
    const { x, y, width, height } = rec;
    const { clientX, clientY } = client;
    let pos;
    if (
        isInArea(x + DW / 2, x + width - DW / 2, clientX) && isInArea(y + DW / 2, y + height - DW / 2, clientY)
    ) {
        pos = Position.in;
    } else if (
        isInArea(x - DW / 2, x + DW / 2, clientX) && isInArea(y - DW / 2, y + DW / 2, clientY)
    ) {
        pos = Position.top_left;
    } else if (
        isInArea(x + width - DW / 2, x + width + DW / 2, clientX) && isInArea(y - DW / 2, y + DW / 2, clientY)
    ) {
        pos = Position.top_right;
    } else if (
        isInArea(x + width - DW / 2, x + width + DW / 2, clientX) && isInArea(y + height - DW / 2, y + height + DW / 2, clientY)
    ) {
        pos = Position.bottom_right;
    } else if (
        isInArea(x - DW / 2, x + DW / 2, clientX) && isInArea(y + height - DW / 2, y + height + DW / 2, clientY)
    ) {
        pos = Position.bottom_left;
    } else if (
        isInArea(x + DW / 2, x + width - DW / 2, clientX) && isInArea(y - DW / 2, y + DW / 2, clientY)
    ) {
        pos = Position.top;
    } else if (
        isInArea(x + width - DW / 2, x + width + DW / 2, clientX) && isInArea(y + DW / 2, y + height - DW / 2, clientY)
    ) {
        pos = Position.right;
    } else if (
        isInArea(x + DW / 2, x + width - DW / 2, clientX) && isInArea(y + height - DW / 2, y + height + DW / 2, clientY)
    ) {
        pos = Position.bottom;
    } else if (
        isInArea(x - DW / 2, x + DW / 2, clientX) && isInArea(y + DW / 2, y + height - DW / 2, clientY)
    ) {
        pos = Position.left;
    } else {
        pos = Position.out;
    }
    return pos;
}

export function on_rectagle_move(rec: Rectangle, client: Cors, last: Last, pos: Position): Rectangle {
    const { clientX, clientY } = client;
    let { x, y, width, height } = rec;
    let dx = clientX - last.x;
    let dy = clientY - last.y;
    const bx = x + width;
    const by = y + height;
    switch (pos) {
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
    return {x,y,width,height};
}


