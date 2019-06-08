import { Injectable } from '@angular/core';
import { PatternUnit } from '../model/pattern-unit';
import { WorkDay } from '../model/workday';
import { CalendarDay } from "../model/ui/calendar-day";
import { DayType } from "../model/daytype";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleByPatternId(employeeId: number,
                              schedule: WorkDay[],
                              days: CalendarDay[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              fn: (createdSchedule: WorkDay[],
                                   updatedSchedule: WorkDay[]) => void) {
    this.generate(employeeId, schedule, days, patternUnits, offset, fn);
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  schedule: WorkDay[],
                                  days: CalendarDay[],
                                  hours: number,
                                  fn: (createdSchedule: WorkDay[],
                                       updatedSchedule: WorkDay[]) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    const customUnits: PatternUnit[] = [patternUnit];
    this.generate(employeeId, schedule, days, customUnits, 0, fn);
  }

  generateScheduleBySingleDay(employeeId: number,
                              schedule: WorkDay[],
                              days: CalendarDay[],
                              hours: number,
                              dayType: DayType,
                              fn: (createdSchedule: WorkDay[],
                                   updatedSchedule: WorkDay[]) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    patternUnit.dayTypeId = dayType.id;
    patternUnit.label = dayType.label;
    const customUnits: PatternUnit[] = [patternUnit];
    this.generate(employeeId, schedule, days, customUnits, 0, fn);
  }

  private generate(employeeId: number,
                   schedule: WorkDay[],
                   days: CalendarDay[],
                   patternUnits: PatternUnit[],
                   offset: number,
                   fn: (createdSchedule: WorkDay[],
                        updatedSchedule: WorkDay[]) => void) {
    if (!schedule || !days || !patternUnits || !(patternUnits.length > 0)) {
      return;
    }
    const createdSchedule: WorkDay[] = [];
    const updatedSchedule: WorkDay[] = [];
    const datesSize = days.length;
    const unitsSize = patternUnits.length;
    for (let i = 0; i < datesSize; i += unitsSize) {
      for (let j = 0; j < unitsSize; j++) {
        const date_index = i + j;
        if (date_index >= datesSize) {
          break;
        }
        const unit_index = (offset + j) % unitsSize;
        const workDay = schedule
          .find(this.getFindFunction(employeeId, days[date_index]));
        if (workDay) {
          workDay.hours = patternUnits[unit_index].value;
          workDay.label = patternUnits[unit_index].label;
          workDay.dayTypeId = patternUnits[unit_index].dayTypeId;
          workDay.holiday = days[date_index].holiday;
          updatedSchedule.push(workDay);
        } else {
          const newWorkDay = this.createWorkDay(
            employeeId,
            days[date_index].holiday,
            patternUnits[unit_index].value,
            days[date_index].isoString,
            patternUnits[unit_index].label);
          createdSchedule.push(newWorkDay);
        }
      }
    }
    fn(createdSchedule, updatedSchedule);
  }

  private getFindFunction(employeeId: number,
                          day: CalendarDay): any {
    return (item) =>
      item.employeeId === employeeId &&
      item.date === day.isoString;
  }

  private createWorkDay(employeeId: number,
                        holiday: boolean,
                        hours: number,
                        date: string,
                        label: string): WorkDay {
    const workDay = new WorkDay();
    workDay.employeeId = employeeId;
    workDay.holiday = holiday;
    workDay.hours = hours;
    workDay.date = date;
    workDay.label = label;
    return workDay;
  }
}
