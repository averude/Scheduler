import { CellData } from "./cell-data";
import { Employee } from "../employee";
import { Position } from "../position";
import { WorkDay } from "../workday";

export class RowData {
  employee:     Employee;
  position:     Position;
  cells:        CellData[];
  workingTimeNorm:  number;
  workDays:     WorkDay[];
  isSubstitution: boolean;
}
