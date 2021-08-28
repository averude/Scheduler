import { Composition } from "../../composition";
import { Employee } from "../../employee";
import { Position } from "../../position";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { RowInterval } from "./row-interval";
import { EmployeeScheduleDTO } from "../../dto/employee-schedule-dto";

export class ScheduleRow extends Row {

  parent:         RowGroup;
  id:             number;
  employee:       Employee;
  position:       Position;
  compositions:   Composition[];
  isSubstitution: boolean;
  cells:          Cell[];
  workingNorm:    number;
  intervals?:     RowInterval[];
  hidden?:        boolean;

  enabledCellCount: number;

  static create(group: RowGroup,
                dto: EmployeeScheduleDTO,
                position: Position,
                workingNorm: number,
                isSubstitution: boolean): ScheduleRow {
    const row = {} as ScheduleRow;
    row.parent = group;
    row.id = dto.parent.id;
    row.employee = dto.parent;
    row.position = position;
    row.isSubstitution = isSubstitution;
    row.cells = [];
    row.workingNorm = workingNorm;
    return row;
  }
}

export interface ScheduleCell extends Cell {
  parent:   ScheduleRow;
  value:    any;
  date:     any;
  enabled:  boolean;
}
