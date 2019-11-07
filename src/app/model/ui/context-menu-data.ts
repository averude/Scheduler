import { TableCellComponent } from "../../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";
import { TableRowComponent } from "../../modules/admin/schedule/components/calendar/components/table-row/table-row.component";

export interface ContextMenuData {
  selectedCells: TableCellComponent[],
  row: TableRowComponent
}
