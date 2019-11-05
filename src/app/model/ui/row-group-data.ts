import { RowData } from "./row-data";
import { Shift } from "../shift";

export class RowGroupData {
  shift: Shift;
  workingTimeNorm: number;
  rows: RowData[];
}
