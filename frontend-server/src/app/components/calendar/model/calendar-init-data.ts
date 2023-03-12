import { CommonDataDTO } from "../../../model/dto/united/common-data-dto";
import { AdminCommonDataDTO } from "../../../model/dto/united/admin-common-data-dto";
import { CalendarDataDTO } from "../../../model/dto/united/calendar-data-dto";
import { DayType } from "../../../model/day-type";
import { Position } from "../../../model/position";
import { Employee } from "../../../model/employee";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { toIdMap, toNumMap } from "../utils/scheduler-utility";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { WorkingNorm } from "../../../model/working-norm";
import { Moment } from "moment";

export class CalendarInitData {
  commonData:       CommonDataDTO;
  adminData:        AdminCommonDataDTO;
  calendarData:     CalendarDataDTO;
  commonDataMaps:   CommonDataMaps;
  calendarDataMaps: CalendarDataMaps;
  // TODO: refactor
  from:             Moment;
  to:               Moment;
  calendarDays:     CalendarDay[];
  // end of refactoring block

  setCommonDataMaps(commonData: CommonDataDTO): void {
    const maps = new CommonDataMaps();
    maps.dayTypeMap  = toIdMap(commonData.dayTypes);
    maps.positionMap = toIdMap(commonData.positions);
    maps.employeeMap = toIdMap(commonData.employees);
    this.commonDataMaps = maps;
  }

  setCalendarDataMaps(calendarData: CalendarDataDTO): void {
    const maps = new CalendarDataMaps();
    maps.scheduleDTOMap   = toNumMap(calendarData.schedule, value => value.employeeId);
    maps.workingNormsMap  = toNumMap(calendarData.workingNorms, value => value.shiftId);
    this.calendarDataMaps = maps;
  }
}

export class CommonDataMaps {
  dayTypeMap:   Map<number, DayType>;
  positionMap:  Map<number, Position>;
  employeeMap:  Map<number, Employee>;
}

export class CalendarDataMaps {
  scheduleDTOMap:   Map<number, EmployeeScheduleDTO>;
  workingNormsMap:  Map<number, WorkingNorm>;
}
