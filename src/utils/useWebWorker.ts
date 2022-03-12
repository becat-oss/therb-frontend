import { useRef, useState, useEffect, useCallback } from "react";

export function useWebWorker<Response>(worker:Worker):{ response: Response | undefined; exec: (args: any) => Promise<void>}{
    const workerRef = useRef<Worker | null>(null);
    const [response, setResponse]=useState(undefined);

    useEffect(()=>{
        workerRef.current = worker;
        workerRef.current.onmessage = (event: {data: any }): void => {
            setResponse(event.data);
        };

        return () => worker.terminate();
    },[]);

    const exec = useCallback(async (args: any):Promise<void> =>{
        worker.postMessage(args);
    },[worker]);

    return {response, exec};
}