import { Composition } from "../../composition";
import { Employee } from "../../employee";
import { Position } from "../../position";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { RowInterval } from "./row-interval";
import { EmployeeScheduleDTO } from "../../dto/employee-schedule-dto";

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

  static create(group: RowGroup,
                dto: EmployeeScheduleDTO,
                position: Position,
                workingNorm: number,
                isSubstitution: boolean): ScheduleRow {
    const row = {} as ScheduleRow;
    row.parent = group;
    row.id = dto.parent.id;
    row.value = new ScheduleRowValue();
    row.value.employee = dto.parent;
    row.value.position = position;
    row.value.isSubstitution = isSubstitution;
    row.value.workingNorm = workingNorm;
    row.cells = [];
    return row;
  }
}

export interface ScheduleCell extends Cell {
  parent:   ScheduleRow;
}
