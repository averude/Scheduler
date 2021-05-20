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

@Injectable()
export class ReportDataSource {

  constructor(private specialCalendarDateService: SpecialCalendarDateService,
              private scheduleService: ScheduleService,
              private dayTypeService: DayTypeService,
              private reportSheetDTOService: ReportSheetDTOService,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private statisticsService: StatisticsService,
              private workingNormService: WorkingNormService){}

  getForDepartment(enterpriseId: number,
                   departmentId: number,
                   from: string,
                   to: string): Observable<ReportInitialData> {
    const sources: Observable<any>[] = [
      this.scheduleService.getAllByDepartmentId(departmentId, from, to),
      this.workingNormService.getAllByDepartmentId(departmentId, from, to),
      this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, from, to),
      this.statisticsService.getSummationDTOByDepartmentId(SummationMode.PER_POSITION, departmentId, from, to,),
      this.dayTypeService.getAllByEnterpriseId(enterpriseId)
        .pipe(map(values => values.sort((a, b) => a.id - b.id))),
      this.shiftService.getAllByDepartmentId(departmentId),
      this.positionService.getAllByDepartmentId(departmentId),
      this.reportSheetDTOService.getAllByDepartmentId(departmentId)
    ];

    return forkJoin(sources).pipe(
      map(([schedule, workingNorms, specialCalendarDates,
             summationDTO, dayTypes, shifts,
             positions, reportSheets]) => ({
        scheduleDTOs:   schedule,
        workingNorms:   workingNorms,
        summationDTOs:  summationDTO,
        dayTypes:       dayTypes,
        shifts:         shifts,
        positions:      positions,
        reportSheets:   reportSheets,
        specialCalendarDates:   specialCalendarDates,
      } as ReportInitialData))
    );
  }

  getForShifts(enterpriseId:  number,
               departmentId:  number,
               shiftIds:      number[],
               from:          string,
               to:            string): Observable<ReportInitialData> {
    const sources: Observable<any>[] = [
      this.scheduleService.getAllByShiftIds(shiftIds, from, to),
      this.workingNormService.getAllByDepartmentId(departmentId, from, to),
      this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, from, to),
      this.statisticsService.getSummationDTOByShiftIds(SummationMode.PER_POSITION, shiftIds, from, to,),
      this.dayTypeService.getAllByEnterpriseId(enterpriseId)
        .pipe(map(values => values.sort((a, b) => a.id - b.id))),
      this.shiftService.getAllByShiftIds(shiftIds),
      this.positionService.getAllByDepartmentId(departmentId)
    ];

    return forkJoin(sources).pipe(
      map(([schedule, workingNorms, specialCalendarDates,
             summationDTO, dayTypes, shifts,
             positions, reportSheets]) => ({
        scheduleDTOs:   schedule,
        workingNorms:   workingNorms,
        summationDTOs:  summationDTO,
        dayTypes:       dayTypes,
        shifts:         shifts,
        positions:      positions,
        reportSheets:   reportSheets,
        specialCalendarDates: specialCalendarDates
      } as ReportInitialData))
    );
  }

}
