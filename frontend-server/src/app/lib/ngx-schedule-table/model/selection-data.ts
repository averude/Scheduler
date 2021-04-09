import { Row } from "./data/row";
import { Cell } from "./data/cell";

export interface SelectionData {
  event:          MouseEvent;
  row:            Row;
  selectedCells:  Cell[];
}
