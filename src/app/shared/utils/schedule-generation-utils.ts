import { CalendarDay } from "../../model/ui/calendar-day";
import { PatternUnit } from "../../model/pattern-unit";
import { WorkDay } from "../../model/workday";

export function createWorkDay(employeeId: number,
                              day: CalendarDay,
                              unit: PatternUnit): WorkDay {
  const workDay = new WorkDay();

  workDay.employeeId  = employeeId;
  workDay.holiday     = day.holiday;
  workDay.hours       = unit.value;
  workDay.date        = day.isoString;
  workDay.dayTypeId   = unit.dayTypeId;

  return workDay;
}

export function updateWorkDay(overrideExistingValues: boolean,
                              workDay: WorkDay,
                              day: CalendarDay,
                              unit: PatternUnit): WorkDay {
  if (overrideExistingValues) {
    workDay.hours   = unit.value;
  }
  workDay.dayTypeId = unit.dayTypeId;
  workDay.holiday   = day.holiday;

  return workDay;
}

export function createOrUpdateWorkDay(overrideExistingValues: boolean,
                               employeeId: number,
                               workDay: WorkDay,
                               unit: PatternUnit,
                               day: CalendarDay,
                               created: WorkDay[],
                               updated: WorkDay[]) {
  if (workDay) {
    updated.push(updateWorkDay(overrideExistingValues, workDay, day, unit));
  } else {
    created.push(createWorkDay(employeeId, day, unit));
  }
}

export function findWorkingDay(schedule: WorkDay[],
                               employeeId: number,
                               day: CalendarDay): WorkDay {
  return schedule
    .find(value =>
      value.employeeId === employeeId
      && value.date === day.isoString);
}
