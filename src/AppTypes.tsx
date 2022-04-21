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
