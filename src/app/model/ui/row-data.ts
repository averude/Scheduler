import { CellData } from "./cell-data";
import { Employee } from "../employee";
import { Position } from "../position";

export class RowData {
  employee:     Employee;
  position:     Position;
  cells:        CellData[];
  workingTimeNorm:  number;
}
