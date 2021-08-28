import { Injectable } from "@angular/core";
import { SubstitutionComposition } from "../../../../model/composition";
import { TableRowRemover } from "../processor/table-row-remover";
import { TableRowProcessor } from "../processor/table-row-processor.service";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { SubstitutionCompositionService } from "../../../../services/http/substitution-composition.service";
import { InitialData } from "../../../../model/datasource/initial-data";
import { Position } from "../../../../model/position";
import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { putSorted } from "../../../../services/utils";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { AbstractCompositionHandler } from "./abstract-composition-handler";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";

@Injectable()
export class SubstitutionCompositionHandler extends AbstractCompositionHandler<SubstitutionComposition> {

  constructor(rowRemover: TableRowRemover,
              rowProcessor: TableRowProcessor,
              intervalCreator: IntervalCreator,
              compositionService: SubstitutionCompositionService) {
    super(rowRemover, rowProcessor, intervalCreator, compositionService);
  }

  createRow(initData: InitialData,
            composition: SubstitutionComposition,
            position: Position,
            group: RowGroup,
            parentRow: ScheduleRow) {
    if (initData.scheduleDTOMap && initData.calendarDays) {

      const dto = initData.scheduleDTOMap.get(composition.employeeId);
      const norm = initData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0;

      putSorted(<SubstitutionComposition>composition, dto.substitutionCompositions);

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData.calendarDays,
        composition, position, norm, true,
        (row) => row.value.position.id === composition.positionId);

      if (parentRow) {
        parentRow.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(parentRow.value.compositions, dto.substitutionCompositions);
      }
      row.value.intervals = row.value.compositions.map(value => convertCompositionToInterval(value));

      return row;
    }
  }

  afterRowUpdated(group: RowGroup,
                  dto: EmployeeScheduleDTO,
                  composition: SubstitutionComposition) {
    const mainShiftComposition = (<SubstitutionComposition>composition).mainComposition;

    group.parent.forEachRowInGroup(mainShiftComposition.shiftId,
      (row: ScheduleRow) => {
        if (row.id === mainShiftComposition.employeeId && !row.value.isSubstitution) {
          row.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.value.compositions, dto.substitutionCompositions);
        }
      });
  }
}
