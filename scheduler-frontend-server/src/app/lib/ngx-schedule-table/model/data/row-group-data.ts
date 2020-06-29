import { RowData } from "./row-data";

export interface RowGroupData {
  groupId: number;
  groupName: string;
  rowData:  RowData[];
}
