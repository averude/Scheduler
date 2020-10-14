import { CellLabelSetter } from "../../../../../../lib/ngx-schedule-table/utils/cell-label-setter";
import { TableCellComponent } from "../../../../../../lib/ngx-schedule-table/table-cell/table-cell.component";
import { binarySearch } from "../../../../../../shared/utils/collection-utils";
import { DayType } from "../../../../../../model/day-type";
import { WorkDay } from "../../../../../../model/workday";
import { calculateWorkHoursByWorkDay } from "../../../../../../shared/utils/time-converter";
import { DayTypeService } from "../../../../../../services/http/day-type.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SchedulerCellLabelSetter implements CellLabelSetter {

  dayTypes: DayType[];

  constructor(private dayTypeService: DayTypeService) {
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes.sort(((a, b) => a.id - b.id)));
  }

  setLabel(cell: TableCellComponent): void {
    if (cell) {
      if (!cell.enabled) {
        cell.label = 'X';
        return;
      }
      if (cell.value) {
        if (cell.cellState === 1 || !cell.value.dayTypeId || !this.dayTypes) {
          this.setHoursWithColor(cell);
        } else {
          this.setLabelWithColor(cell);
        }
      } else {
        cell.label = '-';
      }
    }
  }

  private setHoursWithColor(cell: TableCellComponent) {
    cell.label = this.calcHours(cell.value);
    if (this.dayTypes) {
      let dayType = binarySearch(this.dayTypes, cell.value.dayTypeId);
      if (dayType) {
        cell.labelColor = dayType.dayTypeGroup.color;
      }
    }
  }

  private setLabelWithColor(cell: TableCellComponent) {
    if (this.dayTypes) {
      let dayType = binarySearch(this.dayTypes, cell.value.dayTypeId);
      if (dayType) {
        cell.labelColor = dayType.dayTypeGroup.color;

        if (dayType.label && dayType.label.length > 0) {
          cell.label = dayType.label;
        } else {
          cell.label = this.calcHours(cell.value);
        }
      }
    }
  }

  private calcHours(workDay: WorkDay): number {
    return calculateWorkHoursByWorkDay(workDay);
  }
}
