import { SummationDto, SummationResult } from "../../model/dto/summation-dto";
import { HOURS_SUM, SummationColumn } from "../../model/summation-column";
import { ShiftComposition } from "../../model/shift-composition";
import { WorkingNorm } from "../../model/working-norm";
import { sortByPattern, uniqById } from "../utils/collection-utils";
import { roundToTwo } from "../utils/utils";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StatisticsColumnCompositor {

  composeResults(summationDtos: SummationDto[],
                 summationColumns: SummationColumn[],
                 shiftCompositions: ShiftComposition[],
                 workingNorms: WorkingNorm[]) {
    let mainShiftCompositions = uniqById(shiftCompositions
      .filter(value => !value.substitution), value => value.employee.id);

    summationDtos.forEach(dto => {
      try {
        const shiftId = mainShiftCompositions.find(value => value.employee.id === dto.parent.id).shiftId;
        const norm = workingNorms.find(value => value.shiftId === shiftId);
        dto.collection.push({summationColumnId: -1, value: norm ? norm.hours : 0} as SummationResult);
        dto.collection.push({summationColumnId: -2, value: norm ? norm.days : 0} as SummationResult);

        sortByPattern(dto.collection, summationColumns, (sumRes, sumCol) => {
          const result = sumRes.summationColumnId == sumCol.id;
          if (result && sumRes.type === HOURS_SUM && !sumRes.converted) {
            sumRes.value = roundToTwo(sumRes.value / 60);
            sumRes.converted = true;
          }
          return result;
        });
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
