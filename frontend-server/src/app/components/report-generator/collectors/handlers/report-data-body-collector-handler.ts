import { Injectable } from "@angular/core";
import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { ReportInitialData } from "../../model/report-initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";
import { getMainPositionId, getMainShiftId } from "../../../../services/utils";
import * as moment from "moment";
import { HasEmployeePosition } from "../../model/has-employee-position";
import { Cell } from "../../../../lib/ngx-schedule-table/model/data/cell";
import { SummationType } from "../../../../model/summation-column";
import { roundToTwo } from "../../../../shared/utils/utils";

@Injectable()
export class ReportDataBodyCollectorHandler implements CollectorHandler {

  constructor(private intervalCreator: IntervalCreator) {
  }

  handle(initData: ReportInitialData, tableData: TableData) {
    const collectorStrategy = initData.collectorStrategy;

    initData.shifts.forEach(shift => {
      const group = new RowGroup();
      group.id = shift.id;
      group.value = shift;
      tableData.addGroup(group, (val => val.id - shift.id));
    });

    for (let dto of initData.scheduleDTOs) {
      if (dto.mainCompositions.length == 0 && dto.substitutionCompositions.length == 0) {
        continue;
      }

      const mainShiftId = getMainShiftId(dto);
      if (!mainShiftId) {
        throw new Error('No main shift id provided');
      }

      const mainPosition = initData.positionMap.get(getMainPositionId(dto));
      const from = moment.utc(initData.calendarDays[0].isoString);
      const to = moment.utc(initData.calendarDays[initData.calendarDays.length - 1].isoString);

      const positionIntervalsMap = this.intervalCreator.getEmployeePositionIntervals(
        from, to, dto.mainCompositions, dto.substitutionCompositions);

      positionIntervalsMap.forEach((intervals, positionId) => {

        const rowValue = {
          employee: dto.parent,
          position: initData.positionMap.get(positionId),
          mainPosition: mainPosition,
          intervals: intervals
        } as HasEmployeePosition;

        const summationResults = this.getSummationResults(initData, dto.parent.id, positionId);

        tableData
          .addOrMergeRow(mainShiftId, dto.parent.id, rowValue, () => {
            throw new Error('Merge is not supported');
          })
          .cells = collectorStrategy.collectRowCellData(dto, initData, rowValue, summationResults)
          .map(value => ({
            date: value.date,
            value: value
          } as Cell));
      });

    }
  }

  private getSummationResults(initData: ReportInitialData,
                              employeeId: number,
                              positionId: number) {
    const statDTO = initData.summationDTOMap.get(employeeId);
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
