import { BasicDto } from "../../../model/dto/basic-dto";
import { Employee } from "../../../model/employee";
import { WorkDay } from "../../../model/workday";
import { ReportData, ReportRowData } from "../../generators/report/model/report-row-data";
import { DayType } from "../../../model/day-type";
import { SummationDto, SummationResult } from "../../../model/dto/summation-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { MainShiftComposition } from "../../../model/main-shift-composition";
import { sortByCompositions } from "../../../shared/utils/collection-utils";
import { ReportDataCollector } from "./report-data-collector";
import { ReportCellData, ReportHeaderCell } from "../../generators/report/model/report-cell-data";
import { SummationColumn } from "../../../model/summation-column";

export abstract class AbstractReportDataCollector implements ReportDataCollector {

  abstract REPORT_TYPE: string;

  constructor() {}

  collect(calendarDays: CalendarDay[],
          dayTypes: DayType[],
          schedule: BasicDto<Employee, WorkDay>[],
          summations: SummationDto[],
          summationColumns: SummationColumn[],
          compositions: MainShiftComposition[]): ReportData {
    if (!compositions) {
      return;
    }

    sortByCompositions(schedule, compositions);

    const reportData = new ReportData();
    reportData.tableData = this.getReportRowData(schedule, calendarDays, dayTypes, summations);
    reportData.headerData = this.getHeaders(calendarDays, summationColumns);
    this.afterDataInsert(reportData);

    return reportData;
  }

  private getReportRowData(schedule: BasicDto<Employee, WorkDay>[],
                           dates: CalendarDay[],
                           dayTypes: DayType[],
                           summations: SummationDto[]) {
    return schedule.map((dto, index) => {
      const reportRowData = new ReportRowData();
      reportRowData.reportCellData = this
        .collectRowCellData(dto, dates, dayTypes, this.getSummationResults(summations, dto), index);
      return reportRowData;
    });
  }

  private getSummationResults(summations: SummationDto[],
                              dto: BasicDto<Employee, WorkDay>) {
    return summations
      .find(sum => sum.parent.id === dto.parent.id)
      .collection;
  }


  abstract getHeaders(calendarDays: CalendarDay[],
                      summationColumns: SummationColumn[]): ReportHeaderCell[];

  abstract collectRowCellData(dto: BasicDto<Employee, WorkDay>,
                              calendarDays: CalendarDay[],
                              dayTypes: DayType[],
                              summations: SummationResult[],
                              index: number): ReportCellData[];

  abstract afterDataInsert(data: ReportData);
}
