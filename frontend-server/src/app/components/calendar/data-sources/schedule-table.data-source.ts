import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { EmployeeService } from "../../../services/http/employee.service";
import { ShiftService } from "../../../services/http/shift.service";
import { map, switchMap } from "rxjs/operators";
import { PositionService } from "../../../services/http/position.service";
import { ScheduleService } from "../../../services/http/schedule.service";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { InitialData } from "../../../model/datasource/initial-data";
import { DayTypeService } from "../../../services/http/day-type.service";
import { toIdMap, toNumMap } from "../utils/scheduler-utility";
import { SpecialCalendarDateService } from "../../../services/http/special-calendar-date.service";
import * as moment from "moment";
import { PaginationService } from "../../../shared/paginators/pagination.service";
import { CalendarDaysCalculator } from "../../../services/collectors/calendar-days-calculator";

@Injectable()
export class ScheduleTableDataSource {

  constructor(private paginationService: PaginationService,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private specialCalendarDateService: SpecialCalendarDateService,
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

    const fn = (startDate, endDate) => {
      return [
        this.scheduleService.getAllByDepartmentId(departmentId, startDate, endDate),
        this.workingNormService.getAllByDepartmentId(departmentId, startDate, endDate),
        this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, startDate, endDate)
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

    const fn = (startDate, endDate) => {
      return [
        this.scheduleService.getAllByShiftIds(shiftIds, startDate, endDate),
        this.workingNormService.getAllByDepartmentId(departmentId, startDate, endDate),
        this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, startDate, endDate)
      ];
    };

    return this.getData(obs, fn);
  }

  private getData(obs: Observable<any>[],
                  onPaginationFn: (startDate, endDate) => Observable<any>[]): Observable<InitialData> {
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
              switchMap((dateInterval) => {

                const startDate = dateInterval.from;
                const endDate = dateInterval.to;

                const sources: Observable<any>[] = onPaginationFn(startDate, endDate);

                initData.from = moment.utc(startDate);
                initData.to = moment.utc(endDate);


                return forkJoin(sources).pipe(
                  map(([schedule, workingNorm, specialCalendarDates]) => {
                    initData.scheduleDTOs = schedule;
                    initData.scheduleDTOMap = toNumMap(schedule, value => value.parent.id);
                    initData.workingNormsMap = toNumMap(workingNorm, value => value.shiftId);
                    initData.specialCalendarDates = specialCalendarDates;
                    initData.calendarDays = this.calendarDaysCalculator
                      .calculateCalendarDays(initData.from, initData.to, specialCalendarDates);
                    return initData;
                  })
                );
              })
            )
        )
      );
  }

}
