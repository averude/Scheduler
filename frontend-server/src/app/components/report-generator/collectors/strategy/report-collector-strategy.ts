import { ReportCellValue, ReportHeaderCell } from "../../model/report-cell-value";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { SummationResult } from "../../../../model/dto/employee-work-stat-dto";
import { WorkDay } from "../../../../model/workday";
import { ReportInitialData } from "../../model/report-initial-data";
import { HasEmployeePosition } from "../../model/has-employee-position";

export interface ReportCollectorStrategy {

  REPORT_TYPE: string;

  getHeaders(initData: ReportInitialData): ReportHeaderCell[];

  collectRowCellData(dto: EmployeeScheduleDTO,
                     initData: ReportInitialData,
                     rowValue: HasEmployeePosition,
                     summations: SummationResult[]): ReportCellValue[];

  fillCellWithValue(cell: ReportCellValue,
                    workDay: WorkDay,
                    initData: ReportInitialData): void;

  fillDisabledCell(cell: ReportCellValue);
}

