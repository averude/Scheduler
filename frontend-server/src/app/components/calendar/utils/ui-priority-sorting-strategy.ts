import { SortingStrategy } from "../../../lib/ngx-schedule-table/model/data/sorting-strategy";
import { Injectable } from "@angular/core";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";

@Injectable()
export class UIPrioritySortingStrategy implements SortingStrategy<RowGroup> {

  // TODO: use sorting alg which better suits for almost sorted collections
  sort(groups: RowGroup[]): RowGroup[] {
    const res: RowGroup[] = [].concat(groups);
    return res.sort(((a, b) => b.value.uiPriority - a.value.uiPriority || a.id - b.id));
  }
}
