import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { Position } from "../../../model/position";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { Employee } from "../../../model/employee";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";

export class StatisticsRowGroup extends RowGroup {
  id: number;
  rows: StatisticsEmployeeRow[];
}

export class StatisticsEmployeeRow extends Row {
  id: number;
  employee: Employee;
  rows: StatisticsPositionRow[];
  cells: any;
}

export class StatisticsPositionRow extends Row {
  id: number;
  position: Position;
  cells: StatisticsCell[];
}

export class StatisticsCell implements Cell {
  value: any;
  date: any;
  enabled: boolean;
}
