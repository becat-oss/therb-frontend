import p5 from 'p5';
import { CanvasObject } from './Object';
import { Layer, GeometryObject, CanvasInfo } from 'building-editor-2d/Canvas';
import { EditorState } from './EditorState';

/**
 * キャンバスの情報を保持するクラス。
 * Rhino の実装を見ると 各 Geometry に対して cad のための付加的な情報を与えたものの集合。
 */
export class CanvasDocument {
    layers: Layer[] = [];
    canvasInfo: CanvasInfo;
    canvasObject: CanvasObject;
    geometryObjects: GeometryObject[] = [];
    editorState: EditorState = EditorState.defaultSettings();

    constructor(canvasInfo: CanvasInfo, canvasObject: CanvasObject, geometryObjects: GeometryObject[], layers: Layer[]) {
        this.canvasInfo = canvasInfo;
        this.canvasObject = canvasObject;
        this.geometryObjects = geometryObjects;
        if (layers.length === 0) {
            this.layers.push(new Layer("default", true,1));
        } else {
            this.layers = layers;
        }
    }

    setVisibleLayers(visibleLayerNames: string[]): void {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].isVisible = visibleLayerNames.includes(this.layers[i].name) ? true : false;
        }
    }

    draw(p5: p5): void {
        const visibleLayers = this.layers.filter(layer => layer.isVisible).map(layer => layer.name);
        if (visibleLayers.length === 0) {
            return;
        }

        const color = this.canvasInfo.colorSet.find(color => color.name === this.canvasInfo.colorMode)!;

        // canvasObject を描画
        this.canvasObject.draw(p5, color, this.canvasInfo.scale);

        // 描画対象のレイヤーを描画
        this.geometryObjects
            .filter(obj => visibleLayers.includes(obj.layerName))
            .forEach(obj => obj.draw(p5, color.default, this.canvasInfo.scale, false));

        // 選択されているオブジェクトを描画
        this.geometryObjects
            .filter(obj => obj.isSelected)
            .forEach(obj => obj.draw(p5, color.select, this.canvasInfo.scale, true));

        // 一時的なジオメトリの描画
        this.editorState.editingGeometry
            .filter(obj => obj.isVisible)
            .forEach(obj => obj.draw(p5, color.default, this.canvasInfo.scale, true));
    }

    clearTempGeometry(): void {
        this.editorState.editingGeometry = [];
    }
}
