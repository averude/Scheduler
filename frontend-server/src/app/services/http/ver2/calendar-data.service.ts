import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { CalendarDataDTO } from "../../../model/dto/general/calendar-data-dto";
import { ScheduleService } from "../schedule.service";
import { WorkingNormService } from "../working-norm.service";
import { SpecialCalendarDateService } from "../special-calendar-date.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {

  constructor(private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService,
              private specialCalendarDateService: SpecialCalendarDateService) {}

  getByEnterpriseIdAndDepartmentIdAndDate(enterpriseId: number,
                                          departmentId: number,
                                          startDate: string,
                                          endDate: string): Observable<CalendarDataDTO> {
    const obs: Observable<any>[] = [
      this.scheduleService.getAllByDepartmentId(departmentId, startDate, endDate),
      this.workingNormService.getAllByDepartmentId(departmentId, startDate, endDate),
      this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, startDate, endDate)
    ];

    return forkJoin(obs).pipe(
      map(([schedule, workingNorms, specialCalendarDates]) => ({
        schedule:             schedule,
        workingNorms:         workingNorms,
        specialCalendarDates: specialCalendarDates
      }))
    );
  }

  getByEnterpriseIdAndDepartmentIdAndShiftIdsAndDate(enterpriseId: number,
                                                     departmentId: number,
                                                     shiftIds: number[],
                                                     startDate: string,
                                                     endDate: string): Observable<CalendarDataDTO> {
    const obs: Observable<any>[] = [
      this.scheduleService.getAllByShiftIds(shiftIds, startDate, endDate),
      this.workingNormService.getAllByDepartmentId(departmentId, startDate, endDate),
      this.specialCalendarDateService.getAllByEnterpriseId(enterpriseId, startDate, endDate)
    ];

    return forkJoin(obs).pipe(
      map(([schedule, workingNorms, specialCalendarDates]) => ({
        schedule:             schedule,
        workingNorms:         workingNorms,
        specialCalendarDates: specialCalendarDates
      }))
    );
  }

}
