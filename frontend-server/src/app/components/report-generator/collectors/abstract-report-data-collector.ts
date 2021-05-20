import { ReportData, ReportGroup, ReportRow } from "../model/report-row";
import { DayType } from "../../../model/day-type";
import { EmployeeWorkStatDTO, SummationResult } from "../../../model/dto/employee-work-stat-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportDataCollector } from "./report-data-collector";
import { ReportCellData, ReportHeaderCell } from "../model/report-cell-data";
import { SummationColumn, SummationType } from "../../../model/summation-column";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";
import * as moment from "moment";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { roundToTwo } from "../../../shared/utils/utils";
import { getMainShiftId } from "../../../services/utils";
import { WorkDay } from "../../../model/workday";
import { CellEnabledSetter } from "../../../services/collectors/schedule/cell-enabled-setter";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { ReportInitialData } from "../model/report-initial-data";

export abstract class AbstractReportDataCollector implements ReportDataCollector {

  abstract REPORT_TYPE: string;

  constructor(private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private cellCollector: CellCollector) {}

  collect(initialData: ReportInitialData,
          summationColumns: SummationColumn[],
          useReportLabel: boolean) {
    const reportData = new ReportData();
    reportData.headerData = this.getHeaders(initialData.calendarDays, summationColumns);
    reportData.tableData = this.collectGroup(initialData, useReportLabel);

    this.afterDataInsert(reportData);

    return reportData;
  }

  private collectGroup(initialData: ReportInitialData,
                       useReportLabel?: boolean) {

    const groups: ReportGroup[] = initialData.shifts
      .sort((a, b) => a.id - b.id)
      .map(shift => ({
        id: shift.id,
        name: shift.name,
        rows: []
      }));

    for (let dto of initialData.scheduleDTOs) {
      const shiftId = getMainShiftId(dto);

      const positionIntervalsMap = this.intervalCreator.getEmployeePositionIntervals(
        moment.utc(initialData.calendarDays[0].isoString),
        moment.utc(initialData.calendarDays[initialData.calendarDays.length - 1].isoString),
        dto.mainCompositions,
        dto.substitutionCompositions);

      const rows: ReportRow[] = [];

      positionIntervalsMap.forEach((intervals, positionId) => {
        const reportRowData = new ReportRow();
        const positionName = binarySearch(initialData.positions, (mid => mid.id - positionId))?.shortName;
        reportRowData.reportCellData = this.collectRowCellData(dto,
          initialData.calendarDays, initialData.dayTypes, positionName,
          this.getSummationResults(initialData.summationDTOs, dto.parent.id, positionId), useReportLabel, intervals);
        rows.push(reportRowData);
      });

      if (shiftId > 0) {
        const reportGroupData = binarySearch(groups, (mid => mid.id - shiftId));
        if (reportGroupData && reportGroupData.rows) {
          reportGroupData.rows = reportGroupData.rows.concat(rows);
        }
      }

    }

    return groups;
  }

  private getSummationResults(employeeWorkStats: EmployeeWorkStatDTO[],
                              employeeId: number,
                              positionId: number) {
    const statDTO = binarySearch(employeeWorkStats, (mid => mid.employee.id - employeeId));
    if (statDTO && statDTO.positionStats) {
      return statDTO.positionStats
        .find(value => value.positionId === positionId)
        ?.summations
        .map(summation => {
          summation.value = summation.type === SummationType.HOURS_SUM ? roundToTwo(summation.value / 60) : summation.value;
          return summation;
        });
    }
  }

  abstract getHeaders(calendarDays: CalendarDay[],
                      summationColumns: SummationColumn[]): ReportHeaderCell[];

  abstract collectRowCellData(dto: EmployeeScheduleDTO,
                              calendarDays: CalendarDay[],
                              dayTypes: DayType[],
                              positionName: string,
                              summations: SummationResult[],
                              useReportLabel?: boolean,
                              intervals?: RowInterval[]): ReportCellData[];

  abstract fillCellWithValue(cell: ReportCellData,
                             workDay: WorkDay,
                             dayTypes: DayType[],
                             useReportLabel?: boolean): void;

  abstract fillDisabledCell(cell: ReportCellData);

  abstract afterDataInsert(data: ReportData);

  collectCells(dto: EmployeeScheduleDTO,
               calendarDays: CalendarDay[],
               intervals: RowInterval[],
               dayTypes: DayType[],
               useReportLabel: boolean) {
    const cells = this.cellCollector.collectByFn(calendarDays, dto.collection, (date => {
      const cell = {date: date} as ReportCellData;
      this.fillDisabledCell(cell);
      return cell;
    }), ((cell, hasDate) => cell.workDay = hasDate));

    const from = moment.utc(calendarDays[0].isoString);
    const to = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    this.cellEnabledSetter.processCells(cells, intervals, from, to, (cell => {
      this.fillCellWithValue(cell, cell.workDay, dayTypes, useReportLabel);
    }));

    return cells;
  }
}
