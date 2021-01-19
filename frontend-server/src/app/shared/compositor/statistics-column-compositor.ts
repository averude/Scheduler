import { SummationResult } from "../../model/dto/summation-dto";
import { SummationColumn } from "../../model/summation-column";
import { WorkingNorm } from "../../model/working-norm";
import { sortByPattern } from "../utils/collection-utils";
import { Injectable } from "@angular/core";
import { EmployeeWorkStatDTO } from "../../model/dto/employee-work-stat-dto";

@Injectable({providedIn: 'root'})
export class StatisticsColumnCompositor {

  composeResults(dtos: EmployeeWorkStatDTO[],
                 summationColumns: SummationColumn[],
                 workingNorms: WorkingNorm[]) {
    dtos.forEach(dto => {
      const shiftId = dto.shiftId;
      const norm = workingNorms.find(value => value.shiftId === shiftId);

      dto.positionStats.forEach(pStat => {
        pStat.summations.push({summationColumnId: -1, value: norm ? norm.hours : 0} as SummationResult);
        pStat.summations.push({summationColumnId: -2, value: norm ? norm.days : 0} as SummationResult);

        sortByPattern(pStat.summations, summationColumns, (sumRes, sumCol) => sumRes.summationColumnId == sumCol.id);
      });
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
