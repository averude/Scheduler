import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { ScheduleService } from "../../../services/http/schedule.service";
import { Observable } from "rxjs";
import { InitialData } from "../../../model/datasource/initial-data";
import { map, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleViewTableDataSource {

  constructor(private paginationService: PaginationService,
              private scheduleService: ScheduleService) {}

  byViewId(viewId: number): Observable<InitialData> {
    const initData = new InitialData();
    return this.paginationService.onValueChange
      .pipe(
        switchMap(daysInMonth => {
          initData.calendarDays = daysInMonth;
          return this.scheduleService.getAllByViewId(viewId,
            daysInMonth[0].isoString,
            daysInMonth[daysInMonth.length - 1].isoString)
            .pipe(
              map(schedule => {
                initData.scheduleDto = schedule;
                return initData;
              })
            );
        })
      );
  }
}
