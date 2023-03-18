import { Composition } from "../../../../../model/composition";
import { ScheduleRow } from "../../../model/table-data";
import { Observable } from "rxjs";
import { RowGroup } from "../../../../../lib/ngx-schedule-table/model/data/row-group";
import { CalendarInitData } from "../../../model/calendar-init-data";

export interface CompositionHandler<T extends Composition> {

  createOrUpdate(compositions: T[],
                 rowGroup: RowGroup,
                 row: ScheduleRow,
                 parentRow: ScheduleRow,
                 calendarInitData: CalendarInitData): Observable<any[]>;

  remove(groupData: RowGroup,
         row: ScheduleRow,
         calendarInitData: CalendarInitData,
         compositions: T[]): Observable<any[]>;

}
