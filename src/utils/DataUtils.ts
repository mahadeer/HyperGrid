import { HyperGridDataset } from "../types/HyperGridDataset";

export class DataUtils {
  static getHybridDataset(data: object[]): HyperGridDataset {
    const columnNames = Object.keys(data[0]);
    const noOfRows = data.length;
    const noOfCols = columnNames.length;
    return {
      metadata: {
        columnNames,
        noOfRows,
        noOfCols,
      },
      data,
    };
  }

}