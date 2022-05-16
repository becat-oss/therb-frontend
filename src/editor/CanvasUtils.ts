import { AnalysisPoint, AnalysisLine } from 'types';
import { color as colorSetting } from '../Color';

export interface BoundingBox {
  x: AnalysisLine;
  y: AnalysisLine;
}

export class CanvasUtils {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  scale: number;
  shiftX: number;
  shiftY: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.scale = 1;
    this.shiftX = 0;
    this.shiftY = 0;
  }

  adjust(value: number, type: 'x' | 'y'): number {
    return Math.floor(value * this.scale) + (type === 'x' ? this.shiftX : this.shiftY);
  }

  adjustPoint(point: AnalysisPoint): AnalysisPoint {
    return [this.adjust(point[0], 'x'), this.adjust(point[1], 'y')];
  }

  adjustLine(line: AnalysisLine): AnalysisLine {
    return [[this.adjust(line[0][0], 'x'), this.adjust(line[0][1], 'y')], [this.adjust(line[1][0], 'x'), this.adjust(line[1][1], 'y')]];
  }

  drawPoint(point: AnalysisPoint, size: number): void {
    if (!this.ctx) return;

    point = this.adjustPoint(point);
    this.ctx.beginPath();
    this.ctx.moveTo(point[0], point[1]);
    this.ctx.lineTo(point[0], point[1]);
    this.ctx.fillRect(point[0], point[1], size, size);
  }

  drawLine(line: AnalysisLine, color = colorSetting['canvas/object/light'], width = 1): void {
    if (!this.ctx) return;

    line = this.adjustLine(line);
    this.ctx.beginPath();
    this.ctx.moveTo(line[0][0], line[0][1]);
    this.ctx.lineTo(line[1][0], line[1][1]);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  drawLines(lines: AnalysisLine[]): number {
    lines.forEach(line => {
      this.drawLine(line, '#000000', 1);
    });

    return this.scale;
  }

  drawPolygon(points: AnalysisPoint[], color = colorSetting['canvas/object/light'], fill = false, border = true): void {
    if (!this.ctx) return;

    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const point = this.adjustPoint(points[i]);

      if (i === 0) {
        this.ctx.moveTo(point[0], point[1]);
      } else {
        this.ctx.lineTo(point[0], point[1]);
      }
    }

    this.ctx.closePath();
    border && this.ctx.stroke();
    fill && this.ctx.fill();
  }

  private setScale(diagonalLine: AnalysisLine): void {
    const minX = diagonalLine[1][0];
    const minY = diagonalLine[1][1];
    const width = diagonalLine[0][0] - minX;
    const height = diagonalLine[0][1] - minY;
    const maxRatio = 0.5;
    const maxWidth = this.canvas.width * maxRatio;
    const maxHeight = this.canvas.height * maxRatio;
    this.scale = Math.min(maxWidth / width, maxHeight / height);
    const baseShiftX = -minX * this.scale;
    const baseShiftY = -minY * this.scale;
    this.shiftX = this.canvas.width / 2 - width * this.scale / 2 + baseShiftX;
    this.shiftY = this.canvas.height / 2 - height * this.scale / 2 + baseShiftY;
  }

  computeDiagonalLineFromCoordinates(coordinates: AnalysisPoint[]): AnalysisLine {
    const x = coordinates.map(point => point[0]);
    const y = coordinates.map(point => point[1]);
    return [[Math.max(...x), Math.max(...y)], [Math.min(...x), Math.min(...y)]];
  }

  computeDiagonalLineFromLines(lines: AnalysisLine[]): AnalysisLine {
    const x = lines.flatMap(line => [line[0][0], line[1][0]]);
    const y = lines.flatMap(line => [line[0][1], line[1][1]]);
    return [[Math.max(...x), Math.max(...y)], [Math.min(...x), Math.min(...y)]];
  }

  setScaleFromCoordinates(coordinates: AnalysisPoint[]): void {
    const diagonalLine = this.computeDiagonalLineFromCoordinates(coordinates);
    this.setScale(diagonalLine);
  }

  setScaleFromLines(lines: AnalysisLine[]): void {
    const diagonalLine = this.computeDiagonalLineFromLines(lines);
    this.setScale(diagonalLine);
  }

  getCanvasImage(): string {
    const dataURL = this.canvas.toDataURL();
    return dataURL;
  }

  clearCanvas(): void {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
