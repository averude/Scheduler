import { EmployeeWorkStatDTO, SummationResult } from "../../model/dto/employee-work-stat-dto";
import { SummationColumn } from "../../model/summation-column";
import { WorkingNorm } from "../../model/working-norm";
import { sortByPattern } from "../utils/collection-utils";
import { Injectable } from "@angular/core";
import { Shift } from "../../model/shift";

@Injectable({providedIn: 'root'})
export class StatisticsColumnCompositor {

  composeResults(dtoMap: Map<number, EmployeeWorkStatDTO>,
                 summationColumns: SummationColumn[],
                 workingNorms: WorkingNorm[]) {
    dtoMap.forEach(dto => {
      const shiftId = dto.shiftId;
      const norm = workingNorms.find(value => value.shiftId === shiftId);

      dto.positionStats.forEach(pStat => {
        pStat.summations.push({summationColumnId: -1, value: norm ? norm.hours : 0} as SummationResult);
        pStat.summations.push({summationColumnId: -2, value: norm ? norm.days : 0} as SummationResult);

        sortByPattern(pStat.summations, summationColumns, (sumRes, sumCol) => sumRes.summationColumnId == sumCol.id);
      });
    });
  }

  cr(shifts: Shift[],
     dtoMap: Map<number, EmployeeWorkStatDTO>,
     summationColumns: SummationColumn[],
     workingNorms: WorkingNorm[]) {

    const rangeWorkingNorms = [];

    shifts.forEach(shift => {

      const filtered = workingNorms
        .filter(norm => norm.shiftId === shift.id);

      if (filtered.length > 0) {
        const reduced = filtered
          .reduce((prev, curr) => {
            prev.hours = prev.hours + curr.hours;
            prev.days  = prev.days + curr.days;
            return prev;
          });

        rangeWorkingNorms.push(reduced);
      }

    });

    this.composeResults(dtoMap, summationColumns, rangeWorkingNorms);
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
