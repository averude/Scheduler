import { TableCellComponent } from "../table-cell/table-cell.component";

export abstract class CellLabelSetter {
  abstract setLabel(cell: TableCellComponent): void;
}
