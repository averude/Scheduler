import { CellLabelSetter } from "../../../../../../lib/ngx-schedule-table/utils/cell-label-setter";
import { TableCellComponent } from "../../../../../../lib/ngx-schedule-table/table-cell/table-cell.component";
import { binarySearch } from "../../../../../../shared/utils/utils";
import { DayType } from "../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../model/day-type-group";
import { WorkDay } from "../../../../../../model/workday";
import { calculateWorkHours } from "../../../../../../shared/utils/time-converter";

export class SchedulerCellLabelSetter extends CellLabelSetter {

  dayTypes: DayType[];
  dayTypeGroups: DayTypeGroup[];

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
    // cell.label = cell.value.hours; // here!
    cell.label = this.calcHours(cell.value);
    if (this.dayTypes) {
      // Replace with binary search
      // let dayType = cell.dayTypes.find(item => item.id === cell.value.dayTypeId);
      let dayType = binarySearch(this.dayTypes, cell.value.dayTypeId);
      if (dayType) {
        this.setLabelColor(cell, dayType);
      }
    }
  }

  private setLabelWithColor(cell: TableCellComponent) {
    if (this.dayTypes) {
      // Replace with binary search
      // let dayType = cell.dayTypes.find(item => item.id === cell.value.dayTypeId);
      let dayType = binarySearch(this.dayTypes, cell.value.dayTypeId);
      if (dayType) {

        this.setLabelColor(cell, dayType);

        if (dayType.label && dayType.label.length > 0) {
          cell.label = dayType.label;
        } else {
          // cell.label = cell.value.hours; // here!
          cell.label = this.calcHours(cell.value);
        }
      }
    }
  }

  private setLabelColor(cell: TableCellComponent,
                        dayType: DayType) {
    if (this.dayTypeGroups) {
      // Replace with binary search
      let group = this.dayTypeGroups
        .find(dayTypeGroup => dayTypeGroup.id === dayType.dayTypeGroupId);
      if (group) {
        cell.labelColor = group.color;
      }
    }
  }

  private calcHours(workDay: WorkDay): number {
    let result = 0;
    result = calculateWorkHours(workDay.startTime, workDay.endTime, workDay.breakStartTime, workDay.breakEndTime);
    return result;
  }
}
