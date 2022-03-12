import { useState, useEffect } from "react";
import { useNativeEventListener } from "@material-ui/data-grid";

export function useEventListener(
    eventName: string,
    handler: (arg0: any) => void,
    element: Window | Document | HTMLCanvasElement = window,
): void{
    useEffect(()=>{
        element.addEventListener(eventName, handler);

        return ():void =>{
            element.removeEventListener(eventName, handler);
        };
    },[element]);
}

interface WindowSize {
    width: number;
    height: number;
}

export function useWindowSize(): WindowSize {
    const[windowSize, setWindowSize]=useState<WindowSize>({width: window?.innerWidth, height: window?.innerHeight});
    
    function onWindowResize(): void{
        setWindowSize({width: window?.innerWidth, height: window?.innerHeight});
    }

    useEventListener('resize',onWindowResize);

    return windowSize;
}