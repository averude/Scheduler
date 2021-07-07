import { Row } from "./data/row";

export interface RowCommand {
  rowId: number;
  command?: (row: Row) => void;
}
