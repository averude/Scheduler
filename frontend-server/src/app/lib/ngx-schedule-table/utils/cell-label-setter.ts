import { TableCellComponent } from "../table-cell/table-cell.component";

export interface CellLabelSetter {
  setLabel(cell: TableCellComponent): void;
}

export class SimpleCellLabelSetter implements CellLabelSetter {
  setLabel(cell: TableCellComponent): void {
    if (cell.value) {
      cell.label = cell.value;
    } else {
      cell.label = '-'
    }
  }
}
