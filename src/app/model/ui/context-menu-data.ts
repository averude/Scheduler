import { TableCellComponent } from "../../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";

export interface ContextMenuData {
  employeeId: number,
  selectedCells: TableCellComponent[],
  generatedHandler: (cells) => void,
  errorHandler: (message) => void
}
