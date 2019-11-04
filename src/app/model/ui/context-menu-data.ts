import { TableCellComponent } from "../../modules/admin/schedule/components/calendar/components/table-cell/table-cell.component";
import { WorkDay } from "../workday";

export interface ContextMenuData {
  employeeId: number,
  selectedCells: TableCellComponent[],
  schedule: WorkDay[]
}
