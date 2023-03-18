import { TableCellComponent } from "../components/table-cell/table-cell.component";
import { DayType } from "../../../model/day-type";
import { WorkDay } from "../../../model/workday";
import { calculateHoursByHasTime, getWorkDayDayTypeId } from "../../../shared/utils/utils";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleCellLabelPipe {

  constructor() {}

  setLabel(cell: TableCellComponent,
           dayTypeMap: Map<number, DayType>): void {
    if (cell) {
      if (!cell.cellData.enabled) {
        cell.label = 'X';
        return;
      }
      if (cell.value) {
        let dayTypeId = getWorkDayDayTypeId(cell.value);
        if (cell.cellState === 1 || !dayTypeId || !dayTypeMap) {
          this.setHoursWithColor(cell, dayTypeId, dayTypeMap);
        } else {
          this.setLabelWithColor(cell, dayTypeId, dayTypeMap);
        }
      } else {
        cell.label = '-';
      }
    }
  }

  private setHoursWithColor(cell: TableCellComponent,
                            dayTypeId: number,
                            dayTypeMap: Map<number, DayType>) {
    cell.label = this.calcHours(cell.value);
    if (dayTypeMap) {
      let dayType = dayTypeMap.get(dayTypeId);
      if (dayType) {
        cell.labelColor = dayType.dayTypeGroup.color;
      }
    }
  }

  private setLabelWithColor(cell: TableCellComponent,
                            dayTypeId: number,
                            dayTypeMap: Map<number, DayType>) {
    if (dayTypeMap) {
      let dayType = dayTypeMap.get(dayTypeId);
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
    return calculateHoursByHasTime(workDay);
  }
}
