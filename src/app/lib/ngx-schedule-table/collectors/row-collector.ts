import { RowGroupData } from "../model/data/row-group-data";
import { RowData } from "../model/data/row-data";

export interface RowCollector<T extends RowGroupData, R extends RowData> {
  collect(rowGroup: T): R[];
}
