import { Composition } from "../../../../model/composition";
import { ScheduleRow } from "../../../../model/ui/schedule-table/table-data";
import { InitialData } from "../../../../model/datasource/initial-data";
import { Observable } from "rxjs";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";

export interface CompositionHandler<T extends Composition> {

  createOrUpdate(compositions: T[],
                 rowGroup: RowGroup,
                 row: ScheduleRow,
                 parentRow: ScheduleRow,
                 initData: InitialData): Observable<any[]>;

  remove(groupData: RowGroup,
         row: ScheduleRow,
         initData: InitialData,
         compositions: T[]): Observable<any[]>;

}
