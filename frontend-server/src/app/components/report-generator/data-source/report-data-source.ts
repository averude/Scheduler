import { Injectable } from "@angular/core";
import { SpecialCalendarDateService } from "../../../services/http/special-calendar-date.service";
import { ScheduleService } from "../../../services/http/schedule.service";
import { DayTypeService } from "../../../services/http/day-type.service";
import { ReportSheetDTOService } from "../../../services/http/report-sheet-dto.service";
import { ShiftService } from "../../../services/http/shift.service";
import { PositionService } from "../../../services/http/position.service";
import { StatisticsService } from "../../../services/http/statistics.service";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { forkJoin, Observable } from "rxjs";
import { SummationMode } from "../../../model/dto/employee-work-stat-dto";
import { map } from "rxjs/operators";
import { ReportInitialData } from "../model/report-initial-data";
import { toIdMap } from "../../calendar/utils/scheduler-utility";
import { CalendarDaysCalculator } from "../../../services/collectors/calendar-days-calculator";
import * as moment from "moment";

@Injectable()
export class ReportDataSource {

  constructor(private specialCalendarDateService: SpecialCalendarDateService,
              private calendarDaysCalculator: CalendarDaysCalculator,
              private scheduleService: ScheduleService,
              private dayTypeService: DayTypeService,
              private reportSheetDTOService: ReportSheetDTOService,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private statisticsService: StatisticsService,
              private workingNormService: WorkingNormService){}

  byDepartmentId(enterpriseId: number,
                 departmentId: number,
                 from: string,
                 to: string): Observable<ReportInitialData> {
    const sources: Observable<any>[] = [
      this.scheduleService.getAllByDepartmentId(departmentId, from, to),
      this.workingNormService.getAllByDepartmentId(departmentId, from, to),
      this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, from, to),
      this.statisticsService.getSummationDTOMapByDepartmentId(SummationMode.PER_POSITION, enterpriseId, departmentId, from, to,),
      this.dayTypeService.getMapByEnterpriseId(enterpriseId),
      this.shiftService.getAllByDepartmentId(departmentId),
      this.positionService.getAllByDepartmentId(departmentId),
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
      this.scheduleService.getAllByShiftIds(shiftIds, from, to),
      this.workingNormService.getAllByDepartmentId(departmentId, from, to),
      this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, from, to),
      this.statisticsService.getSummationDTOMapByShiftIds(SummationMode.PER_POSITION, enterpriseId, departmentId, shiftIds, from, to,),
      this.dayTypeService.getMapByEnterpriseId(enterpriseId),
      this.shiftService.getAllByShiftIds(shiftIds),
      this.positionService.getAllByDepartmentId(departmentId)
    ];

    return this.getObservable(from, to, sources);
  }

  private getObservable(from: string,
                        to: string,
                        sources: Observable<any>[]): Observable<ReportInitialData> {
    return forkJoin(sources)
      .pipe(
        map((
          [
            schedule, workingNorms,
            specialCalendarDates,
            summationDTOMap, dayTypeMap, shifts,
            positions, reportSheets
          ]
          ) => (
               {
                 scheduleDTOs: schedule,
                 workingNorms: workingNorms,
                 summationDTOMap: summationDTOMap,
                 dayTypeMap: dayTypeMap,
                 shifts: shifts,
                 positions: positions,
                 positionMap: toIdMap(positions),
                 reportSheets: reportSheets,
                 specialCalendarDates: specialCalendarDates,
                 calendarDays: this.calendarDaysCalculator
                   .calculateCalendarDays(moment.utc(from), moment.utc(to), specialCalendarDates)
               } as ReportInitialData
          )
        )
    );
  }

}
