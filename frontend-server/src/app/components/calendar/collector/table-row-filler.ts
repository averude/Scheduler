import { Composition } from "../../../model/composition";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { InitialData } from "../../../model/datasource/initial-data";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CellCollector } from "../../../shared/collectors/cell-collector";
import { Injectable } from "@angular/core";
import { ScheduleCell, ScheduleRow, ScheduleRowValue } from "../../../model/ui/schedule-table/table-data";
import { WorkDay } from "../../../model/workday";

@Injectable()
export class TableRowFiller {

  constructor(private cellCollector: CellCollector) {}

  fill<T extends Composition>(table: TableData,
                              initData: InitialData,
                              dto: EmployeeScheduleDTO,
                              compositions: T[],
                              isSubstitution: boolean,
                              workingNormConsumer: (composition: T) => number) {
    for (const composition of compositions) {
      const position = initData.positionMap.get(composition.positionId);

      const rowGroup = table.findRowGroup(composition.shiftId);
      if (rowGroup) {
        const workingNorm = workingNormConsumer(composition);

        const value           = new ScheduleRowValue();
        value.employee        = dto.parent;
        value.position        = position;
        value.compositions    = [composition];
        value.isSubstitution  = isSubstitution;
        value.workingNorm     = workingNorm;

        const result = <ScheduleRow> rowGroup.addOrMerge(value.employee.id, value,
          ((row) => {
            row.value.compositions.push(composition);
            row.value.compositions.sort((a, b) => a.from.diff(b.from));
          }));
        result.cells = this.cellCollector.collect<WorkDay, ScheduleCell>(table.headerData, dto.collection, false);
        result.cells.forEach((cell: ScheduleCell) => cell.parent = result);
      }
    }
  }

}
