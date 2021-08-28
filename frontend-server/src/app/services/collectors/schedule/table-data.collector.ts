import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { InitialData } from "../../../model/datasource/initial-data";
import { convertCompositionToInterval } from "../../../model/ui/schedule-table/row-interval";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { TableRowFiller } from "./table-row-filler";
import { CalendarDaysCalculator } from "../calendar-days-calculator";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { UIPrioritySortingStrategy } from "../../../components/calendar/utils/ui-priority-sorting-strategy";
import { ScheduleFilteringStrategy } from "../../../components/calendar/utils/schedule-filtering-strategy";

@Injectable()
export class TableDataCollector {

  constructor(private intervalCreator: IntervalCreator,
              private sortingStrategy: UIPrioritySortingStrategy,
              private filteringStrategy: ScheduleFilteringStrategy,
              private cellEnabledSetter: CellEnabledSetter,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private sumCalculator: TableSumCalculator,
              private rowFiller: TableRowFiller) {}

  handleData(initData: InitialData): TableData {
    const tableData: TableData = new TableData();
    tableData.sortingStrategy = this.sortingStrategy;
    tableData.filteringStrategy = this.filteringStrategy;

    this.collectHeaderData(initData, tableData);
    this.collectBodyData(initData, tableData);

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
    return tableData;
  }

  collectBodyData(initialData: InitialData, tableData: TableData): TableData {
    tableData.from  = initialData.from;
    tableData.to    = initialData.to;

    initialData.shifts.forEach(shift => {
      const group = new RowGroup();
      group.parent = tableData;
      group.id    = shift.id;
      group.value = shift;
      tableData.addGroup(group, (value => value.id - group.id));
    });

    for (let [employeeId, dto] of initialData.scheduleDTOMap) {

      this.rowFiller.fill(tableData, initialData, dto, dto.mainCompositions, false,
        (composition => initialData.workingNormsMap.get(composition.shiftId)?.hours || 0));

      this.rowFiller.fill(tableData, initialData, dto, dto.substitutionCompositions, true,
        (composition => initialData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0))
    }

    return tableData;
  }

  collectHeaderData(initialData: InitialData,
                    tableData: TableData) {
    tableData.headerData = initialData.calendarDays;
  }
}
