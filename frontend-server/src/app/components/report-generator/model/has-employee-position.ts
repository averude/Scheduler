import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";

export interface HasEmployeePosition {
  employee: Employee;
  position: Position;
  intervals: RowInterval[];
  mainPosition: Position;
}
