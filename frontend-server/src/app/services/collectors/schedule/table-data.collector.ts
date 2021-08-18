import * as moment from "moment";
import { ScheduleRow, ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { binarySearch } from "../../../shared/utils/collection-utils";
import { InitialData } from "../../../model/datasource/initial-data";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { TableRowFiller } from "./table-row-filler";

@Injectable()
export class TableDataCollector {

  constructor(private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private rowFiller: TableRowFiller) {}

  handleData(initData: InitialData): TableData {
    const tableData = this.collect(initData);

    tableData.forEachRow((row: ScheduleRow) => {
      const dto = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - row.id));

      if (row.isSubstitution) {
        row.intervals = row.compositions.map(composition => convertCompositionToInterval(composition));
      } else {
        row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
      }

      this.sumCalculator.calculateSum(row, dto.mainCompositions, tableData.from, tableData.to);
      this.cellEnabledSetter.processRow(row, tableData.from, tableData.to);
    });
    return tableData;
  }

  collect(initialData: InitialData): TableData {
    const table: TableData = new TableData();

    table.from  = moment.utc(initialData.calendarDays[0].isoString);
    table.to    = moment.utc(initialData.calendarDays[initialData.calendarDays.length - 1].isoString);

    initialData.shifts.forEach(shift => {
      const group = new ScheduleRowGroup();
      group.parent = table;
      group.id    = shift.id;
      group.value = shift;
      group.name  = shift.name;
      table.addGroup(group, (value => value.id - group.id));
    });

    for (let dto of initialData.scheduleDTOs) {

      this.rowFiller.fill(table, initialData, dto, dto.mainCompositions, false,
        (composition => initialData.workingNormsMap.get(composition.shiftId)?.hours || 0));

      this.rowFiller.fill(table, initialData, dto, dto.substitutionCompositions, true,
        (composition => initialData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0))
    }

    return table;
  }
}
