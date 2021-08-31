import { ReportData, ReportRow } from "../model/report-row";
import { DayType } from "../../../model/day-type";
import { EmployeeWorkStatDTO, SummationResult } from "../../../model/dto/employee-work-stat-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportDataCollector } from "./report-data-collector";
import { ReportCellValue, ReportHeaderCell } from "../model/report-cell-value";
import { SummationColumn, SummationType } from "../../../model/summation-column";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";
import * as moment from "moment";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { roundToTwo } from "../../../shared/utils/utils";
import { getMainShiftId } from "../../../services/utils";
import { WorkDay } from "../../../model/workday";
import { CellEnabledSetter } from "../../../services/collectors/schedule/cell-enabled-setter";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { ReportInitialData } from "../model/report-initial-data";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";

export abstract class AbstractReportDataCollector implements ReportDataCollector {

  abstract REPORT_TYPE: string;

  constructor(private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private cellCollector: CellCollector) {}

  collect(initialData: ReportInitialData,
          summationColumns: SummationColumn[],
          useReportLabel: boolean) {
    const reportData = new ReportData();

    reportData.tableData = this.collectTableData(initialData, summationColumns, useReportLabel);

    this.afterDataInsert(reportData);

    return reportData;
  }

  private collectTableData(initialData: ReportInitialData,
                           summationColumns: SummationColumn[],
                           useReportLabel: boolean): TableData {

    const tableData = new TableData();

    tableData.headerData = this.getHeaders(initialData.calendarDays, summationColumns);

    tableData.groups = initialData.shifts
      .sort((a, b) => a.id - b.id)
      .map(shift => ({
        id: shift.id,
        value: shift.name,
        rows: []
      } as RowGroup));

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
        const positionName = initialData.positionMap.get(positionId)?.shortName;
        reportRowData.reportCellData = this.collectRowCellData(dto, initialData.calendarDays,
          initialData.dayTypeMap, positionName,
          this.getSummationResults(initialData.summationDTOMap, dto.parent.id, positionId),
          useReportLabel, intervals);
        rows.push(reportRowData);
      });

      if (shiftId > 0) {
        const rowGroup = tableData.findRowGroup(shiftId);
        if (rowGroup && rowGroup.rows) {
          rowGroup.rows = rowGroup.rows.concat(rows);
        }
      }

    }

    return tableData;
  }

  private getSummationResults(employeeWorkStatMap: Map<number,EmployeeWorkStatDTO>,
                              employeeId: number,
                              positionId: number) {
    const statDTO = employeeWorkStatMap.get(employeeId);
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
                              dayTypeMap: Map<number, DayType>,
                              positionName: string,
                              summations: SummationResult[],
                              useReportLabel?: boolean,
                              intervals?: RowInterval[]): ReportCellValue[];

  abstract fillCellWithValue(cell: ReportCellValue,
                             workDay: WorkDay,
                             dayTypeMap: Map<number, DayType>,
                             useReportLabel?: boolean): void;

  abstract fillDisabledCell(cell: ReportCellValue);

  abstract afterDataInsert(data: ReportData);

  collectCells(dto: EmployeeScheduleDTO,
               calendarDays: CalendarDay[],
               intervals: RowInterval[],
               dayTypeMap: Map<number, DayType>,
               useReportLabel: boolean) {
    const cells = this.cellCollector.collectByFn(calendarDays, dto.collection, (date => {
      const cell = {date: date} as ReportCellValue;
      this.fillDisabledCell(cell);
      return cell;
    }), ((cell, hasDate) => cell.workDay = hasDate));

    const from = moment.utc(calendarDays[0].isoString);
    const to = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    this.cellEnabledSetter.processCells(cells, intervals, from, to, (cell => {
      this.fillCellWithValue(cell, cell.workDay, dayTypeMap, useReportLabel);
    }));

    return cells;
  }
}
