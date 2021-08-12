import { RowGroup } from "./row-group";

export interface SortingStrategy<T extends RowGroup> {
  sort(groups: T[]): T[];
}
