import { CellLabelSetter } from "../../../../../../../lib/ngx-schedule-table/utils/cell-label-setter";
import { TableCellComponent } from "../../../../../../../lib/ngx-schedule-table/table-cell/table-cell.component";
import { WorkingNorm } from "../../../../../../../model/working-norm";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkingNormCellLabelSetter implements CellLabelSetter {

  setLabel(cell: TableCellComponent): void {
    let workingNorm: WorkingNorm = cell.value;
    if (workingNorm) {
      cell.label = workingNorm.hours + ' / ' + workingNorm.days ;
      cell.labelColor = '#cac6c5';
    }
  }
}
