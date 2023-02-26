import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { ScheduleService } from "../../../services/http/schedule.service";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { InitialData } from "../../../model/datasource/initial-data";
import { toIdMap, toNumMap } from "../utils/scheduler-utility";
import { SpecialCalendarDateService } from "../../../services/http/special-calendar-date.service";
import * as moment from "moment";
import { PaginationService } from "../../../shared/paginators/pagination.service";
import { CalendarDaysCalculator } from "../../../services/calculators/calendar-days-calculator";
import { UserAccountRole } from "../../../model/dto/user-account-dto";
import { CommonDataService } from "../../../services/http/ver2/common-data.service";
import { AdminCommonDataService } from "../../../services/http/ver2/admin-common-data.service";

@Injectable()
export class ScheduleTableDataSource {

  constructor(private paginationService: PaginationService,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private specialCalendarDateService: SpecialCalendarDateService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService,
              private commonDataService: CommonDataService,
              private adminCommonDataService: AdminCommonDataService) {
  }

  byDepartmentId(enterpriseId: number,
                 departmentId: number,
                 role: UserAccountRole): Observable<InitialData> {
    const obs: Observable<any>[] = [
      this.commonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId)
    ];

    if (role === UserAccountRole.ADMIN) {
      obs.push(
        this.adminCommonDataService.getByEnterpriseAndDepartmentId(enterpriseId, departmentId)
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
        this.adminCommonDataService.getByEnterpriseAndDepartmentId(enterpriseId, departmentId)
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
        map(([commonData, adminCommonData]) => {
          const initData = new InitialData();
          initData.dayTypeMap         = toIdMap(commonData.dayTypes);
          initData.positions          = commonData.positions;
          initData.positionMap        = toIdMap(commonData.positions);
          initData.shifts             = commonData.shifts;
          initData.employees          = commonData.employees;
          initData.ratioColumns       = adminCommonData.ratioColumns;
          initData.patternDTOs        = adminCommonData.patternDTOs;
          initData.departmentDayTypes = adminCommonData.departmentDayTypes;
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
