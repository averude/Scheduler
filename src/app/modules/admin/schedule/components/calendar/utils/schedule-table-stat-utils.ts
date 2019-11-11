import { Injectable, QueryList } from "@angular/core";
import { CellData } from "../../../../../../model/ui/cell-data";
import { WorkDay } from "../../../../../../model/workday";
import { TableCellComponent } from "../components/table-cell/table-cell.component";
import { roundToTwo } from "../../../../../../shared/utils/utils";

@Injectable()
export class ScheduleTableStatUtils {

  calculateWorkingTimeSum(cellData: CellData[]): number {
    if (cellData) {
      return this.roundToTwo(cellData
        .filter(cell => cell.workDay)
        .map(cell => cell.workDay.hours)
        .reduce((prev, curr) => prev + curr, 0));
    }
  }

  calculateOverallWorkingTimeSum(workDays: WorkDay[]): number {
    if (workDays) {
      return this.roundToTwo(workDays
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0));
    }
  }

  calculateCellsWorkingTimeSum(cells: QueryList<TableCellComponent>): number {
    if (cells) {
      return roundToTwo(cells
        .filter(cell => cell.workDay != null || cell.workDay != undefined)
        .map(cell => cell.workDay.hours)
        .reduce((prev, curr) => prev + curr, 0));
    }
  }

  calculateWorkingHolidaysSum(schedule): number {
    if (schedule) {
      return this.roundToTwo(schedule
        .filter(workDay => workDay.holiday)
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0));
    }
  }

  /* Note that it doesn't work on IE because the Number.EPSILON is undefined there*/
  private roundToTwo(num): number {
    return Math.round(num * 100 + Number.EPSILON)/100;
  }
}
