import { RowData } from "../../../../../../lib/ngx-schedule-table/model/data/row-data";
import { CellData } from "../../../../../../lib/ngx-schedule-table/model/data/cell-data";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../../../../../model/main-shift-composition";
import { Employee } from "../../../../../../model/employee";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";

export class SchedulerRowData implements RowData {
  parent?:       RowGroupData;
  id:           number;
  employee:     Employee;
  composition:  MainShiftComposition | SubstitutionShiftComposition;
  cellData:     CellData[];
  sum?:         number;
  workingNorm:  number;
  diff?:        number;
  isSubstitution: boolean;
}
