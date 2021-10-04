import { Injectable } from "@angular/core";
import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { TableSumCalculator } from "../../../../services/calculators/table-sum-calculator.service";
import { CellEnabledSetter } from "../../../../shared/collectors/cell-enabled-setter";
import { InitialData } from "../../../../model/datasource/initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";

@Injectable()
export class AfterDataCollectedCollectorHandler implements CollectorHandler {

  constructor(private intervalCreator: IntervalCreator,
              private sumCalculator: TableSumCalculator,
              private cellEnabledSetter: CellEnabledSetter) {
  }

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
