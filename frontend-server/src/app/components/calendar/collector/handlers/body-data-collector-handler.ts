import { Injectable } from "@angular/core";
import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { TableRowFiller } from "../table-row-filler";
import { InitialData } from "../../../../model/datasource/initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";

@Injectable()
export class BodyDataCollectorHandler implements CollectorHandler {

  constructor(private rowFiller: TableRowFiller) {
  }

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
