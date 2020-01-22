import { RowGroupData } from "../model/data/row-group-data";

export interface RowGroupCollector<R extends RowGroupData> {
  collect(): R[];
}
