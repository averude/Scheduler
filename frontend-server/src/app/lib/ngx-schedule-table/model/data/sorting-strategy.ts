import { RowGroup } from "./row-group";

export interface SortingStrategy<T extends RowGroup> {
  sort(groups: T[]): T[];
}

class SimpleSortingStrategy implements SortingStrategy<RowGroup> {

  sort(groups: RowGroup[]): RowGroup[] {
    if (!groups || groups.length === 0) {
      return groups;
    }

    let res: RowGroup[] = [].concat(groups);
    res.sort((a, b) => b.id - a.id);
    return res;
  }

}

export const SIMPLE_SORTING_STRATEGY: SortingStrategy<RowGroup> = new SimpleSortingStrategy();
