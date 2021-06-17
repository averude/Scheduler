import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { EmployeeService } from "../../../services/http/employee.service";
import { ShiftService } from "../../../services/http/shift.service";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { map, switchMap } from "rxjs/operators";
import { PositionService } from "../../../services/http/position.service";
import { ScheduleService } from "../../../services/http/schedule.service";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { InitialData } from "../../../model/datasource/initial-data";
import { DayTypeService } from "../../../services/http/day-type.service";
import { toIdMap, toNumMap } from "../utils/scheduler-utility";

@Injectable()
export class ScheduleTableDataSource {

  constructor(private paginationService: PaginationService,
              private dayTypeService: DayTypeService,
              private employeeService: EmployeeService,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService) {
  }

  byDepartmentId(enterpriseId: number,
                 departmentId: number): Observable<InitialData> {
    const obs: Observable<any>[] = [
      this.dayTypeService.getMapByEnterpriseId(enterpriseId),
      this.positionService.getAllByDepartmentId(departmentId),
      this.shiftService.getAllByDepartmentId(departmentId),
      this.employeeService.getAllByDepartmentId(departmentId)
    ];

    const fn = (daysInMonth) => {
      const from  = daysInMonth[0].isoString;
      const to    = daysInMonth[daysInMonth.length - 1].isoString;

      return [
        this.scheduleService.getAllByDepartmentId(departmentId, from, to),
        this.workingNormService.getAllByDepartmentId(departmentId, from, to)
      ];
    };

    return this.getData(obs, fn);
  }

  byShiftIds(enterpriseId: number,
             departmentId: number,
             shiftIds: number[]): Observable<InitialData> {
    const obs: Observable<any>[] = [
      this.dayTypeService.getMapByEnterpriseId(enterpriseId),
      this.positionService.getAllByDepartmentId(departmentId),
      this.shiftService.getAllByDepartmentId(departmentId)
    ];

    const fn = (daysInMonth) => {
      const from  = daysInMonth[0].isoString;
      const to    = daysInMonth[daysInMonth.length - 1].isoString;

      return [
        this.scheduleService.getAllByShiftIds(shiftIds, from, to),
        this.workingNormService.getAllByDepartmentId(departmentId, from, to)
      ];
    };

    return this.getData(obs, fn);
  }

  private getData(obs: Observable<any>[],
                  onPaginationFn: (daysInMonth) => Observable<any>[]): Observable<InitialData> {
    return forkJoin(obs)
      .pipe(
        map(([dayTypeMap, positions, shifts, employees]) => {
          const initData = new InitialData();
          initData.dayTypeMap   = dayTypeMap;
          initData.positions    = positions;
          initData.positionMap  = toIdMap(positions);
          initData.shifts       = shifts;
          initData.employees    = employees;
          return initData;
        }),
        switchMap((initData) =>
          this.paginationService.onValueChange
            .pipe(
              switchMap(daysInMonth => {
                initData.calendarDays = daysInMonth;

                const sources: Observable<any>[] = onPaginationFn(daysInMonth);

                return forkJoin(sources).pipe(
                  map(([schedule, workingNorm]) => {
                    initData.scheduleDTOs = schedule;
                    initData.workingNormsMap = toNumMap(workingNorm, value => value.shiftId);
                    return initData;
                  })
                );
              })
            )
        )
      );
  }
}
