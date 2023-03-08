import { Injectable } from "@angular/core";
import { MainComposition } from "../../../../model/composition";
import { TableRowRemover } from "../processor/table-row-remover";
import { TableRowProcessor } from "../processor/table-row-processor.service";
import { IntervalCreator } from "../../../../services/creator/interval-creator.service";
import { MainCompositionService } from "../../../../services/http/main-composition.service";
import { InitialData } from "../../../../model/datasource/initial-data";
import { Position } from "../../../../model/position";
import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { putSorted } from "../../../../services/utils";
import { AbstractCompositionHandler } from "./abstract-composition-handler";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";

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
            group: RowGroup,
            parentRow: ScheduleRow) {
    if (initData.scheduleDTOMap && initData.calendarDays) {

      const dto = initData.scheduleDTOMap.get(composition.employeeId);
      const norm = initData.workingNormsMap.get(group.id)?.hours || 0;

      putSorted(<MainComposition>composition, dto.mainCompositions);

      const row = this.rowProcessor.insertNewOrUpdateExistingRow(group, dto, initData,
        composition, position, norm, false);

      row.value.intervals = this.intervalCreator.getEmployeeShiftIntervalsByArr(row.value.compositions, dto.substitutionCompositions);

      return row;
    }
  }

}
