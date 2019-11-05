import { Injectable } from "@angular/core";
import { CellData } from "../../../../../../model/ui/cell-data";

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
