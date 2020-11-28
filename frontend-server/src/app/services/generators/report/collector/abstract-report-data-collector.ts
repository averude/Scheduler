import { BasicDto } from "../../../../model/dto/basic-dto";
import { Employee } from "../../../../model/employee";
import { WorkDay } from "../../../../model/workday";
import { ReportRowData } from "../model/report-row-data";
import { getEmployeeShortName } from "../../../../shared/utils/utils";
import { DayType } from "../../../../model/day-type";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { SummationDto } from "../../../../model/dto/summation-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { MainShiftComposition } from "../../../../model/main-shift-composition";
import { sortByCompositions } from "../../../../shared/utils/collection-utils";
import { ReportDataCollector } from "./report-data-collector";
import { ReportCellData } from "../model/report-cell-data";

export abstract class AbstractReportDataCollector implements ReportDataCollector {

  abstract REPORT_TYPE: string;

  constructor() {}

  collect(dates: CalendarDay[],
          dayTypes: DayType[],
          schedule: BasicDto<Employee, WorkDay>[],
          summations: SummationDto[],
          compositions: MainShiftComposition[]): ReportRowData[] {
    if (!compositions) {
      return;
    }

    sortByCompositions(schedule, compositions);

    return schedule.map((dto, index) => {
      const reportRowData = new ReportRowData();
      reportRowData.name = getEmployeeShortName(dto.parent);
      reportRowData.position = dto.parent.position.shortName;
      reportRowData.cellData = this.getCellData(dto.collection, dates, dayTypes);
      reportRowData.summationResults = this.getSummationResults(summations, dto);
      reportRowData.reportCellData = this.getReportCellData(reportRowData, index);
      return reportRowData;
    })
  }

  private getSummationResults(summations: SummationDto[],
                              dto: BasicDto<Employee, WorkDay>) {
    return summations
      .find(sum => sum.parent.id === dto.parent.id)
      .collection;
  }

  private getCellData(workDays: WorkDay[],
                      dates: CalendarDay[],
                      dayTypes: DayType[]): CellData[] {
    const result = [];
    if (!workDays || !dates || dates.length == 0) {
      return result;
    }

    for (let date_idx = 0, sched_idx = 0; date_idx < dates.length; date_idx++) {
      const date = dates[date_idx];
      const cell = <CellData>{date: date};
      const workDay = workDays[sched_idx];

      if (workDay && date.isoString === workDay.date) {
        this.fillCellWithValue(cell, workDay, dayTypes);
        sched_idx++;
      }
      result.push(cell);
    }

    return result;
  }

  abstract fillCellWithValue(cell: CellData,
                             workDay: WorkDay,
                             dayTypes: DayType[]): void;

  abstract getReportCellData(rowData: ReportRowData, row_data_idx: number): ReportCellData[];
}
