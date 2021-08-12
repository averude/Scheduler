import { Injectable } from "@angular/core";
import { SubstitutionComposition } from "../../../../model/composition";
import { TableRowRemover } from "../../../../services/collectors/schedule/table-row-remover";
import { TableRowProcessor } from "../../../../services/collectors/schedule/table-row-processor.service";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { SubstitutionCompositionService } from "../../../../services/http/substitution-composition.service";
import { InitialData } from "../../../../model/datasource/initial-data";
import { Position } from "../../../../model/position";
import { ScheduleRow, ScheduleRowGroup } from "../../../../model/ui/schedule-table/table-data";
import { binarySearch } from "../../../../shared/utils/collection-utils";
import { putSorted } from "../../../../services/utils";
import { convertCompositionToInterval } from "../../../../model/ui/schedule-table/row-interval";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { AbstractCompositionHandler } from "./abstract-composition-handler";

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
            group: ScheduleRowGroup,
            parentRow: ScheduleRow) {
    if (initData.scheduleDTOs && initData.calendarDays) {

      const dto = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - composition.employeeId));
      const norm = initData.workingNormsMap.get(composition.mainComposition.shiftId)?.hours || 0;

      putSorted(<SubstitutionComposition>composition, dto.substitutionCompositions);

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData.calendarDays,
        composition, position, norm, true,
        (row) => row.position.id === composition.positionId);

      if (parentRow) {
        parentRow.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(parentRow.compositions, dto.substitutionCompositions);
      }
      row.intervals = row.compositions.map(value => convertCompositionToInterval(value));

      return row;
    }
  }

  afterRowUpdated(group: ScheduleRowGroup,
                  dto: EmployeeScheduleDTO,
                  composition: SubstitutionComposition) {
    const mainShiftComposition = (<SubstitutionComposition>composition).mainComposition;

    group.table.forEachRowInGroup(mainShiftComposition.shiftId,
      (row: ScheduleRow) => {
        if (row.id === mainShiftComposition.employeeId && !row.isSubstitution) {
          row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);
        }
      });
  }
}
