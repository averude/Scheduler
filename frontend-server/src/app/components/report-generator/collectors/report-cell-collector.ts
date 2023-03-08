import { CellEnabledSetter } from "../../../shared/collectors/cell-enabled-setter";
import { CellCollector } from "../../../shared/collectors/cell-collector";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { ReportCellValue } from "../model/report-cell-value";
import * as moment from "moment";
import { ReportCollectorStrategy } from "./strategy/report-collector-strategy";
import { Injectable } from "@angular/core";
import { ReportInitialData } from "../model/report-initial-data";

@Injectable()
export class ReportCellCollector {

  constructor(private cellEnabledSetter: CellEnabledSetter,
              private cellCollector: CellCollector) {
  }

  collectCells(collectorStrategy: ReportCollectorStrategy,
               dto: EmployeeScheduleDTO,
               initData: ReportInitialData,
               intervals: RowInterval[]) {
    const calendarDays = initData.calendarDays;
    const dayTypeMap = initData.dayTypeMap;
    const useReportLabel = initData.useReportLabel;

    const cells = this.cellCollector.collectByFn(calendarDays, dto.workDays, (date => {
      const cell = {date: date} as ReportCellValue;
      collectorStrategy.fillDisabledCell(cell);
      return cell;
    }), ((cell, hasDate) => cell.workDay = hasDate));

    const from = moment.utc(calendarDays[0].isoString);
    const to = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    this.cellEnabledSetter.processCells(cells, intervals, from, to, (cell => {
      collectorStrategy.fillCellWithValue(cell, cell.workDay, initData);
    }));

    return cells;
  }
}
