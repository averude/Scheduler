import { ScheduleService } from "../../../services/http/schedule.service";
import { forkJoin, Observable } from "rxjs";
import { InitialData } from "../../../model/datasource/initial-data";
import { map, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DayTypeService } from "../../../services/http/day-type.service";
import { PaginationService } from "../../../shared/paginators/pagination.service";
import { CalendarDaysCalculator } from "../../../services/collectors/calendar-days-calculator";
import { SpecialCalendarDateService } from "../../../services/http/special-calendar-date.service";
import * as moment from "moment";

@Injectable()
export class ScheduleViewTableDataSource {

  constructor(private paginationService: PaginationService,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private specialCalendarDateService: SpecialCalendarDateService,
              private dayTypeService: DayTypeService,
              private scheduleService: ScheduleService) {}

  byViewId(enterpriseId: number, viewId: number): Observable<InitialData> {
    const initData = new InitialData();

    return this.dayTypeService.getMapByEnterpriseId(enterpriseId)
      .pipe(
        switchMap(dayTypeMap => {
          initData.dayTypeMap = dayTypeMap;

          return this.paginationService.onValueChange
            .pipe(
              switchMap(dateInterval => {

                const from = dateInterval.from;
                const to = dateInterval.to;

                const obs: Observable<any>[] = [
                  this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, from, to),
                  this.scheduleService.getAllByViewId(viewId, from, to)
                ];

                return forkJoin(obs)
                  .pipe(
                    map(([specialCalendarDates, schedule]) => {
                      initData.specialCalendarDates = specialCalendarDates;
                      initData.calendarDays = this.calendarDaysCalculator.calculateCalendarDays(
                        moment.utc(from), moment.utc(to), specialCalendarDates
                      );
                      initData.scheduleDTOs = schedule;
                      return initData;
                    })
                  );
              })
            );
        })
      );
  }
}
