import { Cell } from "./cell";

export interface Row {
  id:     number;
  value?: any;
  rows?:  Row[];
  cells:  Cell[];
}
