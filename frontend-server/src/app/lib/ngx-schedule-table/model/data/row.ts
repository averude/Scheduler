import { Cell } from "./cell";
import { RowGroup } from "./row-group";

export class Row {
  parent: RowGroup;
  id:     number;
  value?: any;
  rows?:  Row[];
  cells:  Cell[];
}
