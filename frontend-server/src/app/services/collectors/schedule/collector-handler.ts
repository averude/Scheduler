import { Injectable, InjectionToken } from "@angular/core";
import { IData, InitialData } from "../../../model/datasource/initial-data";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { TableRowFiller } from "./table-row-filler";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";

export interface CollectorHandler {
  handle(initData: IData, tableData: TableData);
}

export const HANDLERS = new InjectionToken<CollectorHandler>('CollectionHandler');

@Injectable()
export class HeaderDataCollectorHandler implements CollectorHandler {

  handle(initData: InitialData, tableData: TableData) {
    tableData.headerData = initData.calendarDays;
  }
}

@Injectable()
export class BodyDataCollectorHandler implements CollectorHandler {

  constructor(private rowFiller: TableRowFiller) {}

  handle(initData: InitialData, tableData: TableData) {
    tableData.from = initData.from;
    tableData.to = initData.to;

    initData.shifts.forEach(shift => {
      const group = new RowGroup();
      group.id = shift.id;
      group.value = shift;
      tableData.addGroup(group, (value => value.id - group.id));
    });

    for (let [employeeId, dto] of initData.scheduleDTOMap) {

      this.rowFiller.fill(tableData, initData, dto, dto.mainCompositions, false,
        (composition => initData.workingNormsMap.get(composition.shiftId)?.hours || 0));

      this.rowFiller.fill(tableData, initData, dto, dto.substitutionCompositions, true,
        (composition => initData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0))
    }
  }
}

@Injectable()
export class AfterDataCollectedCollectorHandler implements CollectorHandler {

  constructor(private intervalCreator: IntervalCreator,
              private sumCalculator: TableSumCalculator,
              private cellEnabledSetter: CellEnabledSetter) {}

  handle(initData: InitialData, tableData: TableData) {
    tableData.forEachRow((row: ScheduleRow) => {
      const dto = initData.scheduleDTOMap.get(row.id);

      if (row.value.isSubstitution) {
        row.value.intervals = row.value.compositions.map(composition => convertCompositionToInterval(composition));
      } else {
        row.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.value.compositions, dto.substitutionCompositions);
      }

      this.sumCalculator.calculateSum(row, dto.mainCompositions, tableData.from, tableData.to);
      this.cellEnabledSetter.processRow(row, tableData.from, tableData.to);
    });
  }
}
