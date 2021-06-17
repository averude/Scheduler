import { Composition } from "../../composition";
import { Employee } from "../../employee";
import { Position } from "../../position";
import { Moment } from "moment";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { RowInterval } from "./row-interval";
import { EmployeeScheduleDTO } from "../../dto/employee-schedule-dto";

export class TableData {
  groups: ScheduleRowGroup[];
  from:   Moment;
  to:     Moment;

  constructor() {
    this.groups = [];
  }

  findRowGroup(groupId: number): ScheduleRowGroup {
    return binarySearch(this.groups, (mid => mid.id - groupId));
  }

  forEachRow(callbackfn: (row: ScheduleRow) => void) {
    this.groups.forEach((group => group.rows.forEach(callbackfn)));
  }

}

export class ScheduleRowGroup extends RowGroup {
  table:  TableData;
  id:     number;
  name:   string;
  rows:   Row[];
}

export class ScheduleRow implements Row {

  group:          ScheduleRowGroup;
  id:             number;
  employee:       Employee;
  position:       Position;
  compositions:   Composition[];
  isSubstitution: boolean;
  cells:          Cell[];
  workingNorm:    number;
  intervals?:     RowInterval[];
  hidden?:        boolean;

  static create(group: ScheduleRowGroup,
                dto: EmployeeScheduleDTO,
                position: Position,
                workingNorm: number,
                isSubstitution: boolean): ScheduleRow {
    const row = {} as ScheduleRow;
    row.group = group;
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
  row:      ScheduleRow;
  value:    any;
  date:     any;
  enabled:  boolean;
}
