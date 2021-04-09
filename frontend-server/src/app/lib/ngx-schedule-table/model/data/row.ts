import { Cell } from "./cell";

export interface Row {
  id:             number;
  rows?:          Row[];
  cells:          Cell[];
}
