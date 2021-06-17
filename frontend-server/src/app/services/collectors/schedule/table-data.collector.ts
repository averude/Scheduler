import * as moment from "moment";
import { ScheduleRowGroup, TableData } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { TableRowProcessor } from "./table-row-processor.service";
import { InitialData } from "../../../model/datasource/initial-data";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";

@Injectable()
export class TableDataCollector {

  constructor(private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private rowProcessor: TableRowProcessor) {}

  handleData(initData: InitialData) {
    const tableData = this.collect(initData);

    tableData.forEachRow(row => {
      if (row.isSubstitution) {
        row.intervals = row.compositions.map(composition => convertCompositionToInterval(composition));
      } else {
        const dto = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - row.id));
        row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
      }

      this.cellEnabledSetter.processRow(row, tableData.from, tableData.to);
    });

    const rowGroupData = tableData.groups;

    this.sumCalculator.calculateWorkHoursSum(rowGroupData);
    return rowGroupData;
  }

  collect(initialData: InitialData): TableData {
    const table: TableData = new TableData();

    table.from  = moment.utc(initialData.calendarDays[0].isoString);
    table.to    = moment.utc(initialData.calendarDays[initialData.calendarDays.length - 1].isoString);

    table.groups = initialData.shifts
      .sort((a, b) => a.id - b.id)
      .map(shift => {
        const group = new ScheduleRowGroup();
        group.table = table;
        group.id    = shift.id;
        group.name  = shift.name;
        return group;
      });

    for (let dto of initialData.scheduleDTOs) {

      this.rowProcessor.fillRows(table, initialData, dto, dto.mainCompositions, false,
        (composition => initialData.workingNormsMap.get(composition.shiftId)?.hours || 0));

      this.rowProcessor.fillRows(table, initialData, dto, dto.substitutionCompositions, true,
        (composition => initialData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0))
    }

    return table;
  }
}
