import { TableCellComponent } from "../table-cell/table-cell.component";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { DayType } from "../../../model/day-type";
import { WorkDay } from "../../../model/workday";
import { calculateHoursByHasTime, getWorkDayDayTypeId } from "../../../shared/utils/utils";
import { DayTypeService } from "../../../services/http/day-type.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../../../services/http/auth.service";

@Injectable()
export class ScheduleCellLabelPipe {

  dayTypes: DayType[];

  constructor(private authService: AuthService,
              private dayTypeService: DayTypeService) {
    const enterpriseId = authService.currentUserAccount.enterpriseId;

    this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  setLabel(cell: TableCellComponent): void {
    if (cell) {
      if (!cell.cellData.enabled) {
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
      let dayType = binarySearch(this.dayTypes, (mid => mid.id - dayTypeId));
      if (dayType) {
        cell.labelColor = dayType.dayTypeGroup.color;
      }
    }
  }

  private setLabelWithColor(cell: TableCellComponent, dayTypeId: number) {
    if (this.dayTypes) {
      let dayType = binarySearch(this.dayTypes, (mid => mid.id - dayTypeId));
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
