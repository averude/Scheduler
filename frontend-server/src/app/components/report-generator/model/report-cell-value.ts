import { Style } from "exceljs";
import { WorkDay } from "../../../model/workday";

export interface ReportCellValue {
  value: any | any[];
  style: Partial<Style> | Partial<Style>[];
  afterCellProcessed?: (cell) => void;
  date?: any;
  workDay?: WorkDay;
  merge?: boolean;
}

export interface ReportHeaderCell extends ReportCellValue {
  merge: boolean;
  width?: number;
}
