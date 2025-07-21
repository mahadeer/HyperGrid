import { GridConfig } from "../types/GridConfig";
import { HyperGridDataset } from "../types/HyperGridDataset";
import { TextUtils } from "./TextUtils";

export class GridUtils {
  static drawGrid(
    ctx: CanvasRenderingContext2D,
    hybridDataset: HyperGridDataset,
    gridConfig: GridConfig
  ) {
    console.log(hybridDataset)
    ctx.fillStyle = gridConfig.themeConfig.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.drawGridLines(ctx, hybridDataset, gridConfig);
    this.drawGridHeaders(ctx, hybridDataset, gridConfig);
    this.drawGridData(ctx, hybridDataset, gridConfig);
  }
  static drawGridData(
    ctx: CanvasRenderingContext2D,
    hybridDataset: HyperGridDataset,
    gridConfig: GridConfig
  ) {
    const { metadata: { columnNames }, data } = hybridDataset;
    const { cellWidth, cellPadding, cellHeight } = gridConfig.cellConfig;
    const { fontFamily, fontSize, rowHeaderFontWeight } = gridConfig.fontConfig;
    const { fontColor, backgroundColor } = gridConfig.themeConfig;

    ctx.fillStyle = fontColor;
    data.forEach((row, rowIdx) => {
      columnNames.forEach((column, colIdx) => {
        if (colIdx === 0) {
          ctx.font = `${rowHeaderFontWeight} ${fontSize}px ${fontFamily}`;
        } else {
          ctx.font = `${fontSize}px ${fontFamily}`;
        }
        const cellValue = String((row as Record<string, string>)[column] || '');
        const xPos = colIdx * cellWidth + cellPadding;
        const yPos = (rowIdx + 1) * cellHeight + 20;
        const truncatedValue = TextUtils.getTruncatedText(cellValue, cellWidth - (2 * cellPadding), ctx);
        ctx.fillText(truncatedValue, xPos, yPos);
      });
    });
  }
  static drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    hybridDataset: HyperGridDataset,
    gridConfig: GridConfig
  ) {
    const { columnNames } = hybridDataset.metadata;
    const { cellWidth, cellPadding } = gridConfig.cellConfig;
    const { fontFamily, fontSize, headerFontWeight } = gridConfig.fontConfig;
    const { headerFontColor } = gridConfig.themeConfig;

    ctx.fillStyle = headerFontColor;
    ctx.font = `${headerFontWeight} ${fontSize}px ${fontFamily}`;
    columnNames.forEach((name, cellIdx) => {
      const xPos = cellIdx * cellWidth + cellPadding;
      const yPos = 20;
      const truncatedHeader = TextUtils.getTruncatedText(name, cellWidth - (2 * cellPadding), ctx);
      ctx.fillText(truncatedHeader, xPos, yPos);
    });
  }

  static drawGridLines(
    ctx: CanvasRenderingContext2D,
    hybridDataset: HyperGridDataset,
    gridConfig: GridConfig
  ) {
    ctx.strokeStyle = gridConfig.themeConfig.gridLinesColor;
    ctx.lineWidth = 2;
    // Draw vertical lines
    const { noOfCols, noOfRows } = hybridDataset.metadata;
    const { cellHeight, cellWidth } = gridConfig.cellConfig;
    const maxWidth = noOfCols * cellWidth;
    const maxHeight = noOfRows * cellHeight;
    for (let i = 0; i <= noOfRows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(maxWidth, i * cellHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= noOfCols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, maxHeight);
      ctx.stroke();
    }
  }
}
