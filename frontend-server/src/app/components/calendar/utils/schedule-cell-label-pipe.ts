import { TableCellComponent } from "../table-cell/table-cell.component";
import { DayType } from "../../../model/day-type";
import { WorkDay } from "../../../model/workday";
import { calculateHoursByHasTime, getWorkDayDayTypeId } from "../../../shared/utils/utils";
import { DayTypeService } from "../../../services/http/day-type.service";
import { Injectable } from "@angular/core";
import { AuthService } from "../../../services/http/auth.service";

@Injectable()
export class ScheduleCellLabelPipe {

  private dayTypeMap: Map<number, DayType>;

  constructor(private authService: AuthService,
              private dayTypeService: DayTypeService) {
    const enterpriseId = authService.currentUserAccount.enterpriseId;

    this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .subscribe(dayTypes => {
        this.dayTypeMap = new Map<number, DayType>();
        dayTypes.forEach(dayType => this.dayTypeMap.set(dayType.id, dayType));
      });
  }

  setLabel(cell: TableCellComponent): void {
    if (cell) {
      if (!cell.cellData.enabled) {
        cell.label = 'X';
        return;
      }
      if (cell.value) {
        let dayTypeId = getWorkDayDayTypeId(cell.value);
        if (cell.cellState === 1 || !dayTypeId || !this.dayTypeMap) {
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
    if (this.dayTypeMap) {
      let dayType = this.dayTypeMap.get(dayTypeId);
      if (dayType) {
        cell.labelColor = dayType.dayTypeGroup.color;
      }
    }
  }

  private setLabelWithColor(cell: TableCellComponent, dayTypeId: number) {
    if (this.dayTypeMap) {
      let dayType = this.dayTypeMap.get(dayTypeId);
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
