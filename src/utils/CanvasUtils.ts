import { GridConfig } from "../types/GridConfig";
import { HyperGridDataset } from "../types/HyperGridDataset";

export class CanvasUtils {
  static clearCanvas(_canvas: HTMLCanvasElement) {
    const ctx = _canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    }
  }

  static initializeCanvas(_canvas: HTMLCanvasElement, mergedConfig: GridConfig) {
    throw new Error('Method not implemented.');
  }


}