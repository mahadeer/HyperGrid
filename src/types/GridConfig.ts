export type GridConfig = {
  fontConfig: {
    fontFamily: string;
    fontSize: number;
    headerFontWeight: number;
    rowHeaderFontWeight: number;
  },
  cellConfig: {
    autoSize: boolean;
    cellWidth: number;
    cellHeight: number;
    freezeRows: number;
    freezeColumns: number;
    cellPadding: number;
  },
  themeConfig: {
    fontColor: string;
    backgroundColor: string;
    alternateBackgroundColor: string;
    headerBackgroundColor: string;
    headerFontColor: string;
    gridLinesColor: string;
  },
  gridConfig: {
    showRowHeaders: boolean;
    showColumnHeaders: boolean;
    showGridLines: boolean;
  }
};

export const defaultGridConfig: GridConfig = {
  fontConfig: {
    fontFamily: 'Inter',
    fontSize: 14,
    headerFontWeight: 700,
    rowHeaderFontWeight: 500,
  },
  themeConfig: {
    headerBackgroundColor: '#f2f2f2',
    headerFontColor: '#333',
    fontColor: '#333',
    backgroundColor: '#f5f5f5',
    alternateBackgroundColor: '#f9f9f9',
    gridLinesColor: '#ccc',
  },
  cellConfig: {
    autoSize: true,
    cellWidth: 120,
    cellHeight: 30,
    freezeRows: 0,
    freezeColumns: 0,
    cellPadding: 5,
  },
  gridConfig: {
    showRowHeaders: true,
    showColumnHeaders: true,
    showGridLines: true,
  },
};
