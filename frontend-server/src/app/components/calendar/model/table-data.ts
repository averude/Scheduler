import { Composition } from "../../../model/composition";
import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";

export class ScheduleRowValue {
  employee:       Employee;
  position:       Position;
  compositions:   Composition[];
  isSubstitution: boolean;
  workingNorm:    number;
  intervals?:     RowInterval[];
}

export class ScheduleRow extends Row {
  value:          ScheduleRowValue;
  hidden?:        boolean;
  enabledCellCount: number;
}

export interface ScheduleCell extends Cell {
  parent:   ScheduleRow;
}
