import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportCellValue, ReportHeaderCell } from "../../model/report-cell-value";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { DayType } from "../../../../model/day-type";
import { SummationResult } from "../../../../model/dto/employee-work-stat-dto";
import { RowInterval } from "../../../../model/ui/schedule-table/row-interval";
import { WorkDay } from "../../../../model/workday";

export interface ReportCollectorStrategy {

  REPORT_TYPE: string;

  getHeaders(calendarDays: CalendarDay[],
             summationColumns: SummationColumn[]): ReportHeaderCell[];

  collectRowCellData(dto: EmployeeScheduleDTO,
                     calendarDays: CalendarDay[],
                     dayTypeMap: Map<number, DayType>,
                     positionName: string,
                     summations: SummationResult[],
                     useReportLabel?: boolean,
                     intervals?: RowInterval[]): ReportCellValue[];

  fillCellWithValue(cell: ReportCellValue,
                    workDay: WorkDay,
                    dayTypeMap: Map<number, DayType>,
                    useReportLabel?: boolean): void;

  fillDisabledCell(cell: ReportCellValue);
}

