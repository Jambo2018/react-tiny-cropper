import { useEffect } from "react";
import {MoveEventCallBack} from "../type";


export function useMoveEvent(onDown:MoveEventCallBack, onMove:MoveEventCallBack, onUp:MoveEventCallBack) {
    const onMouseDown=function(e:MouseEvent){
        onDown(e.clientX,e.clientY);
    }
    const onMouseMove=function(e:MouseEvent){
        onMove(e.clientX,e.clientY);
    }
    const onMouseUp=function(e:MouseEvent){
        onUp(e.clientX,e.clientY);
    }

    const onTouchStart=function(e:TouchEvent){
        onDown(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
    }
    const onTouchMove=function(e:TouchEvent){
        onMove(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
    }
    const onTouchEnd=function(e:TouchEvent){
        onUp(e.changedTouches[0].clientX,e.changedTouches[0].clientY);
    }
    useEffect(() => {
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
        return () => {
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [onMouseDown, onMouseMove, onMouseUp,onTouchStart,onTouchMove,onTouchEnd]);
}

