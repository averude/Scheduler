import { RowData } from "./row-data";

export interface RowGroupData {
  id:   number;
  name: string;
  rows: RowData[];
}
