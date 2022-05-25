//import { AnalysisFloorGeometry } from "types";

export class Layer {
    name: string
    color: string;
    index: number;
    isVisible = true;
    isLocked = false;

    constructor(name: string, isVisible: boolean, index: number, isLocked = false, color = '#ffffff') {
        this.name = name;
        this.isVisible = isVisible;
        this.index = index;
        this.isLocked = isLocked;
        this.color = color;
    }

    //TODO: これはここではなく別のクラスにあるべき。BauesAnalysis依存とは分離したほうが良い
    // static createFromFloorGeometries(floorGeometries: AnalysisFloorGeometry[], visibleFloors: string[]): Layer[] {
    //     const layers: Layer[] = [];

    //     if (floorGeometries.length > 0) {
    //         for (let floor = 0; floor < floorGeometries.length; floor++) {
    //             const name = String(floorGeometries[floor].floor);
    //             let isVisible: boolean;
    //             if (visibleFloors.includes(name) || visibleFloors.length === 0) {
    //                 isVisible = true;
    //             } else {
    //                 isVisible = false;
    //             }
    //             layers.push(new Layer(name, isVisible, layers.length));
    //         }
    //     } else {
    //         layers.push(new Layer('default', true, 0));
    //     }

    //     return layers;
    // }
}
