import { SummationDto, SummationResult } from "../../model/dto/summation-dto";
import { SummationColumn } from "../../model/summation-column";
import { WorkingNorm } from "../../model/working-norm";
import { sortByPattern } from "../utils/collection-utils";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StatisticsColumnCompositor {

  composeResults(summationDtos: SummationDto[],
                 summationColumns: SummationColumn[],
                 workingNorms: WorkingNorm[]) {
    summationDtos.forEach(dto => {
      try {
        const shiftId = dto.shiftId;
        const norm = workingNorms.find(value => value.shiftId === shiftId);

        dto.collection.push({summationColumnId: -1, value: norm ? norm.hours : 0} as SummationResult);
        dto.collection.push({summationColumnId: -2, value: norm ? norm.days : 0} as SummationResult);

        sortByPattern(dto.collection, summationColumns, (sumRes, sumCol) => sumRes.summationColumnId == sumCol.id);
      } finally {}
    });
  }

  composeColumns(summationColumns: SummationColumn[]) {
    summationColumns.push({
      id: -1,
      name: 'Норма'
    } as SummationColumn);
    summationColumns.push({
      id: -2,
      name: 'Норма явок'
    } as SummationColumn);
  }
}
