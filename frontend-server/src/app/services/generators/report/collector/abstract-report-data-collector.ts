import { BasicDto } from "../../../../model/dto/basic-dto";
import { Employee } from "../../../../model/employee";
import { WorkDay } from "../../../../model/workday";
import { ReportRowData } from "../model/report-row-data";
import { DayType } from "../../../../model/day-type";
import { SummationDto, SummationResult } from "../../../../model/dto/summation-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { MainShiftComposition } from "../../../../model/main-shift-composition";
import { sortByCompositions } from "../../../../shared/utils/collection-utils";
import { ReportDataCollector } from "./report-data-collector";
import { ReportCellData, ReportHeaderCell } from "../model/report-cell-data";
import { SummationColumn } from "../../../../model/summation-column";

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

    return this.getReportRowData(schedule, dates, dayTypes, summations);
  }

  private getReportRowData(schedule: BasicDto<Employee, WorkDay>[],
                           dates: CalendarDay[],
                           dayTypes: DayType[],
                           summations: SummationDto[]) {
    return schedule.map((dto, index) => {
      const reportRowData = new ReportRowData();
      reportRowData.reportCellData = this
        .collectRowReportCellData(dto, dates, dayTypes, this.getSummationResults(summations, dto), index);
      return reportRowData;
    });
  }

  private collectRowReportCellData(dto: BasicDto<Employee, WorkDay>,
                                   dates,
                                   dayTypes,
                                   summations: SummationResult[],
                                   index) {
    const result: ReportCellData[] = [];

    this.setRowFirstCells(result, dto.parent, index);
    this.setRowDataCells(result, dto.collection, dates, dayTypes, index);
    this.setRowSumDataCells(result, summations, index);

    return result;
  }

  abstract setRowFirstCells(cellData: ReportCellData[],
                            dtoParent: Employee,
                            rowIndex: number);

  abstract setRowDataCells(cellData: ReportCellData[],
                           workDays: WorkDay[],
                           dates: CalendarDay[],
                           dayTypes: DayType[],
                           rowIndex: number);

  abstract setRowSumDataCells(cellData: ReportCellData[],
                              summations: SummationResult[],
                              rowIndex: number);

  abstract fillCellWithValue(cell: ReportCellData,
                             workDay: WorkDay,
                             dayTypes: DayType[]): void;

  abstract getHeaders(calendarDays: CalendarDay[],
                      summationColumns: SummationColumn[]): ReportHeaderCell[];

  private getSummationResults(summations: SummationDto[],
                              dto: BasicDto<Employee, WorkDay>) {
    return summations
      .find(sum => sum.parent.id === dto.parent.id)
      .collection;
  }
}
