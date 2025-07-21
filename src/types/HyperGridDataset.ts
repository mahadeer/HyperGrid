export type HyperGridDataset = {
  metadata: HyperGridMetadata;
  data: object[];
};

export type HyperGridMetadata = {
  columnNames: string[];
  noOfRows: number;
  noOfCols: number;
};
