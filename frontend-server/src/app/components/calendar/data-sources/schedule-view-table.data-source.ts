import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { ScheduleService } from "../../../services/http/schedule.service";
import { Observable } from "rxjs";
import { InitialData } from "../../../model/datasource/initial-data";
import { map, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DayTypeService } from "../../../services/http/day-type.service";

@Injectable()
export class ScheduleViewTableDataSource {

  constructor(private paginationService: PaginationService,
              private dayTypeService: DayTypeService,
              private scheduleService: ScheduleService) {}

  byViewId(enterpriseId: number, viewId: number): Observable<InitialData> {
    const initData = new InitialData();
    return this.dayTypeService.getMapByEnterpriseId(enterpriseId)
      .pipe(switchMap(dayTypeMap => {
        initData.dayTypeMap = dayTypeMap;

        return this.paginationService.onValueChange
          .pipe(
            switchMap(daysInMonth => {
              initData.calendarDays = daysInMonth;
              return this.scheduleService.getAllByViewId(viewId,
                daysInMonth[0].isoString,
                daysInMonth[daysInMonth.length - 1].isoString)
                .pipe(
                  map(schedule => {
                    initData.scheduleDTOs = schedule;
                    return initData;
                  })
                );
            })
          );
      }));
  }
}
