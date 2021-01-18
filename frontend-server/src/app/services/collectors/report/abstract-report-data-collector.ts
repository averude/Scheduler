import { ReportData, ReportGroupData, ReportRowData } from "../../generators/report/model/report-row-data";
import { DayType } from "../../../model/day-type";
import { Position } from "../../../model/position";
import { SummationDto, SummationResult } from "../../../model/dto/summation-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportDataCollector } from "./report-data-collector";
import { ReportCellData, ReportHeaderCell } from "../../generators/report/model/report-cell-data";
import { SummationColumn, SummationType } from "../../../model/summation-column";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { Shift } from "../../../model/shift";
import { CompositionDivider } from "../../divider/composition-divider.service";
import * as moment from "moment";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { roundToTwo } from "../../../shared/utils/utils";

export abstract class AbstractReportDataCollector implements ReportDataCollector {
  private divider: CompositionDivider = new CompositionDivider();

  abstract REPORT_TYPE: string;

  constructor() {}

  collect(calendarDays: CalendarDay[],
          dayTypes: DayType[],
          shifts: Shift[],
          positions: Position[],
          schedule: EmployeeScheduleDTO[],
          summations: SummationDto[],
          summationColumns: SummationColumn[],
          useReportLabel?: boolean): ReportData {

    const reportData = new ReportData();
    reportData.headerData = this.getHeaders(calendarDays, summationColumns);
    const reportGroupData = this.collectGroup(shifts, schedule, calendarDays, dayTypes, positions, summations, useReportLabel);
    reportData.tableData = this.convertToRows(reportGroupData);
    this.afterDataInsert(reportData);

    return reportData;
  }

  private collectGroup(shifts: Shift[],
                       schedule: EmployeeScheduleDTO[],
                       dates: CalendarDay[],
                       dayTypes: DayType[],
                       positions: Position[],
                       summations: SummationDto[],
                       useReportLabel?: boolean) {

    const groups: ReportGroupData[] = shifts
      .sort((a, b) => a.id - b.id)
      .map(shift => ({
        id: shift.id,
        name: shift.name,
        rows: []
      }));

    for (let dto of schedule) {
      const shiftId = getMainShiftId(dto);

      const positionIntervalsMap = this.divider.getEmployeePositionIntervals(
        moment.utc(dates[0].isoString),
        moment.utc(dates[dates.length - 1].isoString),
        dto.mainShiftCompositions,
        dto.substitutionShiftCompositions);

      const rows: ReportRowData[] = [];

      positionIntervalsMap.forEach((intervals, positionId) => {
        const reportRowData = new ReportRowData();
        const positionName = binarySearch(positions, (mid => mid.id - positionId))?.shortName;
        reportRowData.reportCellData = this
          .collectRowCellData(dto, dates, dayTypes, positionName,
            this.getSummationResults(summations, dto.parent.id, positionId), 0, useReportLabel, intervals);
        rows.push(reportRowData);
      });

      if (shiftId > 0) {
        const reportGroupData = binarySearch(groups, (mid => mid.id - shiftId));
        reportGroupData.rows = reportGroupData.rows.concat(rows);
      }

    }

    return groups;
  }

  private convertToRows(groups: ReportGroupData[]) {
    const rows: ReportRowData[] = [];
    groups.forEach(group => group.rows.forEach(row => rows.push(row)));
    return rows;
  }

  private getSummationResults(summations: SummationDto[],
                              employeeId: number,
                              positionId: number) {
    return summations
      .find(sum => sum.parent.id === employeeId && sum.positionId === positionId)
      .collection
      .map(summation => {
        summation.value = summation.type === SummationType.HOURS_SUM ? roundToTwo(summation.value / 60) : summation.value;
        return summation;
      });
  }


  abstract getHeaders(calendarDays: CalendarDay[],
                      summationColumns: SummationColumn[]): ReportHeaderCell[];

  abstract collectRowCellData(dto: EmployeeScheduleDTO,
                              calendarDays: CalendarDay[],
                              dayTypes: DayType[],
                              positionName: string,
                              summations: SummationResult[],
                              index: number,
                              useReportLabel?: boolean,
                              intervals?: RowInterval[]): ReportCellData[];

  abstract afterDataInsert(data: ReportData);
}

export function getMainShiftId(dto: EmployeeScheduleDTO) {

  const lastMainCompositionIndex = dto.mainShiftCompositions.length - 1;

  if (lastMainCompositionIndex >= 0) {
    return dto.mainShiftCompositions[lastMainCompositionIndex].shiftId;
  } else {
    const lastSubstitutionCompositionIndex = dto.substitutionShiftCompositions.length - 1;

    if (lastSubstitutionCompositionIndex >= 0) {
      return dto.substitutionShiftCompositions[lastSubstitutionCompositionIndex]
        .mainShiftComposition
        .shiftId;
    }
  }
}
