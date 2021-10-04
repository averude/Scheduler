import { map } from "rxjs/operators";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { forkJoin, Observable } from "rxjs";
import { WorkingNormInitialData } from "../../../model/datasource/initial-data";
import * as moment from "moment";
import { Injectable } from "@angular/core";
import { ShiftPatternService } from "../../../services/http/shift-pattern.service";

@Injectable()
export class WorkingNormDataSource {

  constructor(private workingNormService: WorkingNormService,
              private shiftPatternService: ShiftPatternService) {}

  byDepartmentId(departmentId: number,
                 from: string,
                 to: string): Observable<WorkingNormInitialData> {
    const obs: Observable<any>[] = [
      this.shiftPatternService.getAllByDepartmentId(departmentId),
      this.workingNormService.getAllDTOByDepartmentId(departmentId, from, to)
    ];

    return forkJoin(obs).pipe(
      map(([shiftPatterns, dtos]) => {
        const initData = new WorkingNormInitialData();
        initData.shiftPatterns = shiftPatterns;
        initData.shifts = dtos.map(dto => dto.parent).filter(shift => !shift.hidden);
        initData.workingNormDTOs = dtos.filter(dto => !dto.parent.hidden);
        initData.from = moment.utc(from);
        initData.to = moment.utc(to);
        return initData;
      })
    )
  }

}


