import { Style } from "exceljs";
import { WorkDay } from "../../../../model/workday";

export interface ReportCellData {
  value: any | any[];
  style: Partial<Style> | Partial<Style>[];
  afterCellProcessed?: (cell) => void;
  date?: any;
  workDay?: WorkDay;
  merge?: boolean;
}

export interface ReportHeaderCell extends ReportCellData {
  merge: boolean;
  width?: number;
}

export interface ReportWorkDayCell extends ReportCellData {
  date: any;
  workDay: WorkDay;
  merge: boolean;
}
