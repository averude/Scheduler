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
import { CalendarDaysCalculator } from "../calendar-days-calculator";

@Injectable()
export class TableDataCollector {

  constructor(private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private sumCalculator: TableSumCalculator,
              private rowFiller: TableRowFiller) {}

  handleData(initData: InitialData): TableData {
    const tableData: TableData = new TableData();

    this.collectHeaderData(initData, tableData);
    this.collectBodyData(initData, tableData);

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

  collectBodyData(initialData: InitialData, tableData: TableData): TableData {
    tableData.from  = initialData.from;
    tableData.to    = initialData.to;

    initialData.shifts.forEach(shift => {
      const group = new ScheduleRowGroup();
      group.parent = tableData;
      group.id    = shift.id;
      group.value = shift;
      group.name  = shift.name;
      tableData.addGroup(group, (value => value.id - group.id));
    });

    for (let dto of initialData.scheduleDTOs) {

      this.rowFiller.fill(tableData, initialData, dto, dto.mainCompositions, false,
        (composition => initialData.workingNormsMap.get(composition.shiftId)?.hours || 0));

      this.rowFiller.fill(tableData, initialData, dto, dto.substitutionCompositions, true,
        (composition => initialData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0))
    }

    return tableData;
  }

  collectHeaderData(initialData: InitialData,
                    tableData: TableData) {
    const calendarDays = this.calendarDaysCalculator.calculateCalendarDays(
      initialData.from,
      initialData.to,
      initialData.specialCalendarDates);

    tableData.headerData = calendarDays;
  }
}
