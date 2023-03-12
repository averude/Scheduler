import { Injectable } from "@angular/core";
import { ICollectorHandler } from "../../../../shared/collectors/collector-handler";
import { TableRowFiller } from "../table-row-filler";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";
import { CalendarInitData } from "../../model/calendar-init-data";

@Injectable()
export class BodyDataCollectorHandler implements ICollectorHandler {

  constructor(private rowFiller: TableRowFiller) {
  }

  handle(calendarInitData: CalendarInitData, tableData: TableData) {
    tableData.from = calendarInitData.from;
    tableData.to = calendarInitData.to;

    calendarInitData.commonData.shifts.forEach(shift => {
      const group = new RowGroup();
      group.id = shift.id;
      group.value = shift;
      tableData.addGroup(group, (value => value.id - group.id));
    });

    for (let [employeeId, dto] of calendarInitData.calendarDataMaps.scheduleDTOMap) {

      this.rowFiller.fill(tableData, calendarInitData, dto, dto.mainCompositions, false,
        (composition => calendarInitData.calendarDataMaps.workingNormsMap.get(composition.shiftId)?.hours || 0));

      this.rowFiller.fill(tableData, calendarInitData, dto, dto.substitutionCompositions, true,
        (composition => calendarInitData.calendarDataMaps.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0))
    }
  }
}
