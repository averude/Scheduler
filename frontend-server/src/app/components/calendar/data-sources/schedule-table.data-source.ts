import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as moment from "moment";
import { PaginationService } from "../../../shared/paginators/pagination.service";
import { CalendarDaysCalculator } from "../../../services/calculators/calendar-days-calculator";
import { UserAccountRole } from "../../../model/dto/user-account-dto";
import { CommonDataService } from "../../../services/http/united/common-data.service";
import { AdminCommonDataService } from "../../../services/http/united/admin-common-data.service";
import { CalendarDataService } from "../../../services/http/united/calendar-data.service";
import { CalendarDataDTO } from "../../../model/dto/united/calendar-data-dto";
import { CalendarInitData } from "../model/calendar-init-data";

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
                 role: UserAccountRole): Observable<CalendarInitData> {
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
             role: UserAccountRole): Observable<CalendarInitData> {
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
                  onPaginationFn: (startDate, endDate) => Observable<CalendarDataDTO>): Observable<CalendarInitData> {
    return forkJoin(obs)
      .pipe(
        map(([commonData, adminCommonData]) => {
          const calendarInitData = new CalendarInitData();
          calendarInitData.setCommonDataMaps(commonData);
          calendarInitData.commonData = commonData;
          calendarInitData.adminData  = adminCommonData;
          return calendarInitData;
        }),
        switchMap((calendarInitData: CalendarInitData) =>
          this.paginationService.onValueChange
            .pipe(
              switchMap((dateInterval) => {

                const startDate = dateInterval.from;
                const endDate = dateInterval.to;

                calendarInitData.from = moment.utc(startDate);
                calendarInitData.to = moment.utc(endDate);

                return onPaginationFn(startDate, endDate).pipe(
                  map((calendarData) => {
                    calendarInitData.calendarData = calendarData;
                    calendarInitData.setCalendarDataMaps(calendarData);
                    calendarInitData.calendarDays = this.calendarDaysCalculator
                      .calculateCalendarDays(calendarInitData.from, calendarInitData.to, calendarData.specialCalendarDates);
                    return calendarInitData;
                  })
                );
              })
            )
        )
      );
  }

}
