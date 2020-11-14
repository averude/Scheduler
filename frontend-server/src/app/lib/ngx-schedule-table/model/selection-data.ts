import { RowData } from "./data/row-data";
import { CellData } from "./data/cell-data";

export interface SelectionData {
  event: MouseEvent;
  rowData: RowData;
  selectedCells: CellData[];
}
