import { CellLabelSetter } from "../../../../../../lib/ngx-schedule-table/utils/cell-label-setter";
import { TableCellComponent } from "../../../../../../lib/ngx-schedule-table/table-cell/table-cell.component";
import { binarySearch } from "../../../../../../shared/utils/collection-utils";
import { DayType } from "../../../../../../model/day-type";
import { WorkDay } from "../../../../../../model/workday";
import { calculateWorkHoursByWorkDay, getWorkDayDayTypeId } from "../../../../../../shared/utils/utils";
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
        let dayTypeId = getWorkDayDayTypeId(cell.value);
        if (cell.cellState === 1 || !dayTypeId || !this.dayTypes) {
          this.setHoursWithColor(cell, dayTypeId);
        } else {
          this.setLabelWithColor(cell, dayTypeId);
        }
      } else {
        cell.label = '-';
      }
    }
  }

  private setHoursWithColor(cell: TableCellComponent, dayTypeId: number) {
    cell.label = this.calcHours(cell.value);
    if (this.dayTypes) {
      let dayType = binarySearch(this.dayTypes, dayTypeId);
      if (dayType) {
        cell.labelColor = dayType.dayTypeGroup.color;
      }
    }
  }

  private setLabelWithColor(cell: TableCellComponent, dayTypeId: number) {
    if (this.dayTypes) {
      let dayType = binarySearch(this.dayTypes, dayTypeId);
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
