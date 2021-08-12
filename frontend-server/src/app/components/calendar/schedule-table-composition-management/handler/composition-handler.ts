import { Composition } from "../../../../model/composition";
import { ScheduleRow, ScheduleRowGroup } from "../../../../model/ui/schedule-table/table-data";
import { InitialData } from "../../../../model/datasource/initial-data";
import { Observable } from "rxjs";

export interface CompositionHandler<T extends Composition> {

  createOrUpdate(compositions: T[],
                 rowGroup: ScheduleRowGroup,
                 row: ScheduleRow,
                 parentRow: ScheduleRow,
                 initData: InitialData): Observable<any[]>;

  remove(groupData: ScheduleRowGroup,
         row: ScheduleRow,
         initData: InitialData,
         compositions: T[]): Observable<any[]>;

}
