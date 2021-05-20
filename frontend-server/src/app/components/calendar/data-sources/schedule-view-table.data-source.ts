import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { ScheduleService } from "../../../services/http/schedule.service";
import { Observable } from "rxjs";
import { InitialData } from "../../../model/datasource/initial-data";
import { map, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { DayTypeService } from "../../../services/http/day-type.service";
import { toIdMap } from "../utils/scheduler-utility";

@Injectable()
export class ScheduleViewTableDataSource {

  constructor(private paginationService: PaginationService,
              private dayTypeService: DayTypeService,
              private scheduleService: ScheduleService) {}

  byViewId(enterpriseId: number, viewId: number): Observable<InitialData> {
    const initData = new InitialData();
    return this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .pipe(switchMap(dayTypes => {
        initData.dayTypes = dayTypes;
        initData.dayTypeMap = toIdMap(dayTypes);

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
