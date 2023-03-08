import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { InitialData } from "../../../model/datasource/initial-data";
import { toIdMap, toNumMap } from "../utils/scheduler-utility";
import * as moment from "moment";
import { PaginationService } from "../../../shared/paginators/pagination.service";
import { CalendarDaysCalculator } from "../../../services/calculators/calendar-days-calculator";
import { UserAccountRole } from "../../../model/dto/user-account-dto";
import { CommonDataService } from "../../../services/http/united/common-data.service";
import { AdminCommonDataService } from "../../../services/http/united/admin-common-data.service";
import { CalendarDataService } from "../../../services/http/united/calendar-data.service";
import { CalendarDataDTO } from "../../../model/dto/united/calendar-data-dto";

@Injectable()
export class ScheduleTableDataSource {

  constructor(private paginationService: PaginationService,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private commonDataService: CommonDataService,
              private adminCommonDataService: AdminCommonDataService,
              private calendarDataService: CalendarDataService) {
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
      return this.calendarDataService
          .getByEnterpriseIdAndDepartmentIdAndDate(enterpriseId, departmentId, startDate, endDate);
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
      return this.calendarDataService
          .getByEnterpriseIdAndDepartmentIdAndShiftIdsAndDate(
            enterpriseId, departmentId, shiftIds, startDate, endDate);
    };

    return this.getData(obs, fn);
  }

  private getData(obs: Observable<any>[],
                  onPaginationFn: (startDate, endDate) => Observable<CalendarDataDTO>): Observable<InitialData> {
    return forkJoin(obs)
      .pipe(
        map(([commonData, adminCommonData]) => {
          const initData = new InitialData();
          initData.dayTypeMap         = toIdMap(commonData.dayTypes);
          initData.positions          = commonData.positions;
          initData.positionMap        = toIdMap(commonData.positions);
          initData.shifts             = commonData.shifts;
          initData.employees          = commonData.employees;
          initData.employeeMap        = toIdMap(commonData.employees);
          initData.ratioColumns       = adminCommonData?.ratioColumns;
          initData.patternDTOs        = adminCommonData?.patternDTOs;
          initData.departmentDayTypes = adminCommonData?.departmentDayTypes;
          return initData;
        }),
        switchMap((initData) =>
          this.paginationService.onValueChange
            .pipe(
              switchMap((dateInterval) => {

                const startDate = dateInterval.from;
                const endDate = dateInterval.to;

                initData.from = moment.utc(startDate);
                initData.to = moment.utc(endDate);

                return onPaginationFn(startDate, endDate).pipe(
                  map((calendarData) => {
                    initData.scheduleDTOs = calendarData.schedule;
                    initData.scheduleDTOMap = toNumMap(calendarData.schedule, value => value.employeeId);
                    initData.workingNormsMap = toNumMap(calendarData.workingNorms, value => value.shiftId);
                    initData.specialCalendarDates = calendarData.specialCalendarDates;
                    initData.calendarDays = this.calendarDaysCalculator
                      .calculateCalendarDays(initData.from, initData.to, calendarData.specialCalendarDates);
                    return initData;
                  })
                );
              })
            )
        )
      );
  }

}
