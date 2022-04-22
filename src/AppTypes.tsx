export interface AppState {
    mode: string;
    setMode: (newMode: string) => void;
}

export type cellType={
    readOnly?: boolean
    value: number|string
}

export type gridProps=cellType[][]

export interface ProjectData{
    id: number;
    name: string;
}

export interface TimeSeriesDataObject{
    roomId?: number;
    results?:TimeSeriesData;
}

export interface TimeSeriesData{
    [key:string]:number[];
}

export const timeseriesKeys = ['roomT','clodS','rhexS','ahexS','fs','clodL','rhexL','ahexL','fl','mrt'];
export type TimeSeriesKey = typeof timeseriesKeys[number];
//type TimeSeriesData = number[];