import { ReportInitialData } from "../model/report-initial-data";
import { SummationColumn, SummationType } from "../../../model/summation-column";
import { ReportData } from "../model/report-data";
import { ReportCollectorStrategy } from "./strategy/report-collector-strategy";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { getMainPositionId, getMainShiftId } from "../../../services/utils";
import * as moment from "moment";
import { HasEmployeePosition } from "../model/has-employee-position";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { roundToTwo } from "../../../shared/utils/utils";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";
import { ReportTableSortingStrategy } from "../../../shared/table-sorting-strategies/report-table-sorting-strategy";
import { Injectable } from "@angular/core";

@Injectable()
export class DefaultReportDataCollector {

  constructor(private intervalCreator: IntervalCreator,
              private tableSortingStrategy: ReportTableSortingStrategy) {}

  collect(collectorStrategy: ReportCollectorStrategy,
          initialData: ReportInitialData,
          summationColumns: SummationColumn[],
          useReportLabel: boolean): ReportData {
    const reportData = new ReportData();

    reportData.tableData = this.collectTableData(collectorStrategy, initialData, summationColumns, useReportLabel);

    collectorStrategy.afterDataInsert(reportData);

    return reportData;
  }

  private collectTableData(collectorStrategy: ReportCollectorStrategy,
                           initialData: ReportInitialData,
                           summationColumns: SummationColumn[],
                           useReportLabel: boolean): TableData {

    const tableData = new TableData(this.tableSortingStrategy);

    tableData.headerData = collectorStrategy.getHeaders(initialData.calendarDays, summationColumns);

    initialData.shifts.forEach(shift => {
      const group = new RowGroup();
      group.id = shift.id;
      group.value = shift;

      tableData.addGroup(group, (val => val.id - shift.id));
    });

    for (let dto of initialData.scheduleDTOs) {
      if (dto.mainCompositions.length == 0 && dto.substitutionCompositions.length == 0) {
        continue;
      }

      const mainShiftId = getMainShiftId(dto);
      if (!mainShiftId) {
        throw new Error('No main shift id provided');
      }

      const mainPosition = initialData.positionMap.get(getMainPositionId(dto));

      const positionIntervalsMap = this.intervalCreator.getEmployeePositionIntervals(
        moment.utc(initialData.calendarDays[0].isoString),
        moment.utc(initialData.calendarDays[initialData.calendarDays.length - 1].isoString),
        dto.mainCompositions,
        dto.substitutionCompositions);

      positionIntervalsMap.forEach((intervals, positionId) => {
        const position = initialData.positionMap.get(positionId);

        const rowValue = {
          employee: dto.parent,
          position: position,
          mainPosition: mainPosition,
          intervals: intervals
        } as HasEmployeePosition;

        const positionName = position?.shortName;
        const summationResults = this.getSummationResults(initialData.summationDTOMap, dto.parent.id, positionId);

        tableData
          .addOrMergeRow(mainShiftId, dto.parent.id, rowValue, () => {
            throw new Error('Merge is not supported');
          })
          .cells = collectorStrategy.collectRowCellData(dto, initialData.calendarDays, initialData.dayTypeMap, positionName, summationResults, useReportLabel, intervals)
          .map(value => ({
            date: value.date,
            value: value
          } as Cell));
      });

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
}
