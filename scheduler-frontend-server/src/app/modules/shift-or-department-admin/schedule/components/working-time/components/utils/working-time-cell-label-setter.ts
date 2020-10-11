import { CellLabelSetter } from "../../../../../../../lib/ngx-schedule-table/utils/cell-label-setter";
import { TableCellComponent } from "../../../../../../../lib/ngx-schedule-table/table-cell/table-cell.component";
import { WorkingTime } from "../../../../../../../model/working-time";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkingTimeCellLabelSetter implements CellLabelSetter {

  setLabel(cell: TableCellComponent): void {
    let workingTime: WorkingTime = cell.value;
    if (workingTime) {
      cell.label = workingTime.hours + ' / ' + workingTime.days ;
      cell.labelColor = 'mistyrose';
    }
  }
}
