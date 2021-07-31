import { SortingStrategy } from "../../../lib/ngx-schedule-table/model/data/sorting-strategy";
import { ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleSortingStrategy implements SortingStrategy<ScheduleRowGroup> {

  // TODO: use sorting alg which better suits for almost sorted collections
  sort(groups: ScheduleRowGroup[]): ScheduleRowGroup[] {
    const res: ScheduleRowGroup[] = [].concat(groups);
    return res.sort(((a, b) => b.shift.uiPriority - a.shift.uiPriority || a.id - b.id));
  }
}
