import { Composition } from "../../../model/composition";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { InitialData } from "../../../model/datasource/initial-data";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CellCollector } from "../cell-collector";
import { createNewRow, isUpdateOperation } from "../utils";
import { Injectable } from "@angular/core";

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

        rowGroup.init(
          (row => isUpdateOperation(row?.value.position.id === composition.positionId, row, isSubstitution, composition)),
          (row => {
            row.value.compositions.push(composition);
            return row;
          }),
          (() => {
            const newRow = createNewRow(this.cellCollector, rowGroup, table.headerData, dto, position, workingNorm, isSubstitution);
            newRow.value.compositions = [composition];
            return newRow;
          })
        );
      }
    }
  }

}