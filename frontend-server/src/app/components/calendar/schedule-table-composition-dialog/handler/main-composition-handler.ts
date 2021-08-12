import { Injectable } from "@angular/core";
import { MainComposition } from "../../../../model/composition";
import { TableRowRemover } from "../../../../services/collectors/schedule/table-row-remover";
import { TableRowProcessor } from "../../../../services/collectors/schedule/table-row-processor.service";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { MainCompositionService } from "../../../../services/http/main-composition.service";
import { InitialData } from "../../../../model/datasource/initial-data";
import { Position } from "../../../../model/position";
import { ScheduleRow, ScheduleRowGroup } from "../../../../model/ui/schedule-table/table-data";
import { binarySearch } from "../../../../shared/utils/collection-utils";
import { putSorted } from "../../../../services/utils";
import { AbstractCompositionHandler } from "./abstract-composition-handler";

@Injectable()
export class MainCompositionHandler extends AbstractCompositionHandler<MainComposition> {

  constructor(rowRemover: TableRowRemover,
              rowProcessor: TableRowProcessor,
              intervalCreator: IntervalCreator,
              compositionService: MainCompositionService) {
    super(rowRemover, rowProcessor, intervalCreator, compositionService);
  }

  createRow(initData: InitialData,
            composition: MainComposition,
            position: Position,
            group: ScheduleRowGroup,
            parentRow: ScheduleRow) {
    if (initData.scheduleDTOs && initData.calendarDays) {

      const dto = binarySearch(initData.scheduleDTOs, (mid => mid.parent.id - composition.employeeId));
      const norm = initData.workingNormsMap.get(group.id)?.hours || 0;

      putSorted(<MainComposition>composition, dto.mainCompositions);

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData.calendarDays,
        composition, position, norm, false,
        (row) => row.position.id === composition.positionId);

      row.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.compositions, dto.substitutionCompositions);

      return row;
    }
  }

}
