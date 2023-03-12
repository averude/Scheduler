import { Injectable } from "@angular/core";
import { ReportSheetDTOService } from "../../../services/http/report-sheet-dto.service";
import { StatisticsService } from "../../../services/http/statistics.service";
import { forkJoin, Observable } from "rxjs";
import { SummationMode } from "../../../model/dto/employee-work-stat-dto";
import { map } from "rxjs/operators";
import { ReportInitialData } from "../model/report-initial-data";
import { toIdMap } from "../../calendar/utils/scheduler-utility";
import { CalendarDaysCalculator } from "../../../services/calculators/calendar-days-calculator";
import * as moment from "moment";
import { CalendarDataService } from "../../../services/http/united/calendar-data.service";
import { CommonDataService } from "../../../services/http/united/common-data.service";

@Injectable()
export class ReportDataSource {

  constructor(private calendarDaysCalculator: CalendarDaysCalculator,
              private reportSheetDTOService: ReportSheetDTOService,
              private statisticsService: StatisticsService,
              private commonDataService: CommonDataService,
              private calendarDataService: CalendarDataService){}

  byDepartmentId(enterpriseId: number,
                 departmentId: number,
                 from: string,
                 to: string): Observable<ReportInitialData> {
    const sources: Observable<any>[] = [
      this.calendarDataService.getByEnterpriseIdAndDepartmentIdAndDate(enterpriseId, departmentId, from, to),
      this.statisticsService.getSummationDTOMapByDepartmentId(SummationMode.PER_POSITION, enterpriseId, departmentId, from, to,),
      this.commonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId),
      this.reportSheetDTOService.getAllByDepartmentId(departmentId)
    ];

    return this.getObservable(from, to, sources);
  }

  byShiftIds(enterpriseId:  number,
             departmentId:  number,
             shiftIds:      number[],
             from:          string,
             to:            string): Observable<ReportInitialData> {
    const sources: Observable<any>[] = [
      this.calendarDataService.getByEnterpriseIdAndDepartmentIdAndShiftIdsAndDate(enterpriseId, departmentId, shiftIds, from, to),
      this.statisticsService.getSummationDTOMapByShiftIds(SummationMode.PER_POSITION, enterpriseId, departmentId, shiftIds, from, to,),
      this.commonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId),
    ];

    return this.getObservable(from, to, sources);
  }

  private getObservable(from: string,
                        to: string,
                        sources: Observable<any>[]): Observable<ReportInitialData> {
    return forkJoin(sources)
      .pipe(
        map(([calendarData, summationDTOMap, commonData, reportSheets]) => (
               {
                 scheduleDTOs: calendarData.schedule,
                 workingNorms: calendarData.workingNorms,
                 summationDTOMap: summationDTOMap,
                 dayTypeMap: toIdMap(commonData.dayTypes),
                 shifts: commonData.shifts.filter(shift => !shift.hidden),
                 positions: commonData.positions,
                 positionMap: toIdMap(commonData.positions),
                 employeeMap: toIdMap(commonData.employees),
                 reportSheets: reportSheets,
                 specialCalendarDates: calendarData.specialCalendarDates,
                 calendarDays: this.calendarDaysCalculator
                   .calculateCalendarDays(moment.utc(from), moment.utc(to), calendarData.specialCalendarDates)
               } as ReportInitialData
          )
        )
    );
  }

}
