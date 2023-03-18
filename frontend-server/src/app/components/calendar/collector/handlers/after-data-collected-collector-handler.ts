import { Injectable } from "@angular/core";
import { ICollectorHandler } from "../../../../shared/collectors/collector-handler";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { TableSumCalculator } from "../../../../services/calculators/table-sum-calculator.service";
import { CellEnabledSetter } from "../../../../shared/collectors/cell-enabled-setter";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { ScheduleRow } from "../../model/table-data";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";
import { CalendarInitData } from "../../model/calendar-init-data";

@Injectable()
export class AfterDataCollectedCollectorHandler implements ICollectorHandler {

  constructor(private intervalCreator: IntervalCreator,
              private sumCalculator: TableSumCalculator,
              private cellEnabledSetter: CellEnabledSetter) {
  }

  handle(calendarInitData: CalendarInitData, tableData: TableData) {
    tableData.forEachRow((row: ScheduleRow) => {
      const dto = calendarInitData.calendarDataMaps.scheduleDTOMap.get(row.id);

      if (row.value.isSubstitution) {
        row.value.intervals = row.value.compositions.map(composition => convertCompositionToInterval(composition));
      } else {
        row.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.value.compositions, dto.substitutionCompositions);
      }

      this.sumCalculator.calculateRow(row, dto.mainCompositions, calendarInitData);
      this.cellEnabledSetter.processRow(row, tableData.from, tableData.to);
    });
  }
}
