import { Style } from "exceljs";

export interface ReportCellData {
  value: any | any[];
  style: Partial<Style> | Partial<Style>[];
  afterCellProcessed?: (cell) => void;
}
