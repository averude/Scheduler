import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { ScheduleService } from "../../../services/http/schedule.service";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { InitialData } from "../../../model/datasource/initial-data";
import { toIdMap, toNumMap } from "../utils/scheduler-utility";
import { SpecialCalendarDateService } from "../../../services/http/special-calendar-date.service";
import * as moment from "moment";
import { PaginationService } from "../../../shared/paginators/pagination.service";
import { CalendarDaysCalculator } from "../../../services/calculators/calendar-days-calculator";
import { ShiftPatternDtoService } from "../../../services/http/shift-pattern-dto.service";
import { DepartmentDayTypeService } from "../../../services/http/department-day-type.service";
import { UserAccountRole } from "../../../model/dto/user-account-dto";
import { RatioColumnService } from "../../../services/http/ratio-column.service";
import { CommonDataService } from "../../../services/http/ver2/common-data.service";

export const DEPARTMENTS: number[] = [11, 16, 17, 18, 19, 20];

@Injectable()
export class ScheduleTableDataSource {

  constructor(private paginationService: PaginationService,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private specialCalendarDateService: SpecialCalendarDateService,
              private ratioColumnService: RatioColumnService,
              private shiftPatternDtoService: ShiftPatternDtoService,
              private departmentDayTypeService: DepartmentDayTypeService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService,
              private commonDataService: CommonDataService) {
  }

  byDepartmentId(enterpriseId: number,
                 departmentId: number,
                 role: UserAccountRole): Observable<InitialData> {
    const obs: Observable<any>[] = [
      this.commonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId)
    ];

    if (role === UserAccountRole.ADMIN) {
      obs.push(
        // Temporary
        DEPARTMENTS
          .indexOf(departmentId) >= 0 ? this.ratioColumnService.getAllByEnterpriseId(enterpriseId) : of([]),
        //
        this.shiftPatternDtoService.getAllByDepartmentId(departmentId),
        this.departmentDayTypeService.getAllByDepartmentId(departmentId)
      );
    }

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
             shiftIds: number[],
             role: UserAccountRole): Observable<InitialData> {
    const obs: Observable<any>[] = [
      this.commonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId)
    ];

    if (role === UserAccountRole.ADMIN) {
      obs.push(
        // Temporary
        DEPARTMENTS
          .indexOf(departmentId) >= 0 ? this.ratioColumnService.getAllByEnterpriseId(enterpriseId) : of([]),
        //
        this.shiftPatternDtoService.getAllByDepartmentId(departmentId),
        this.departmentDayTypeService.getAllByDepartmentId(departmentId)
      );
    }

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
        map(([commonData, ratioColumns, patternDTOs, departmentDayTypes]) => {
          const initData = new InitialData();
          initData.dayTypeMap   = toIdMap(commonData.dayTypes);
          initData.positions    = commonData.positions;
          initData.positionMap  = toIdMap(commonData.positions);
          initData.shifts       = commonData.shifts;
          initData.employees    = commonData.employees;
          initData.ratioColumns = ratioColumns;
          initData.patternDTOs  = patternDTOs;
          initData.departmentDayTypes = departmentDayTypes;
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
