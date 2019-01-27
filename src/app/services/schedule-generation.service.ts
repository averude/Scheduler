import { Injectable } from '@angular/core';
import { PatternUnit } from '../model/patternunit';
import { WorkDay } from '../model/workday';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleByPatternId(employeeId: number,
                              schedule: WorkDay[],
                              dates: Date[],
                              patternUnits: PatternUnit[],
                              fn: (createdSchedule: WorkDay[],
                                   updatedSchedule: WorkDay[]) => void) {
    this.generate(employeeId, schedule, dates, patternUnits, 0, fn);
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  schedule: WorkDay[],
                                  dates: Date[],
                                  hours: number,
                                  fn: (createdSchedule: WorkDay[],
                                       updatedSchedule: WorkDay[]) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    const customUnits: PatternUnit[] = [patternUnit];
    this.generate(employeeId, schedule, dates, customUnits, 0, fn);
  }

  private generate(employeeId: number,
                   schedule: WorkDay[],
                   dates: Date[],
                   patternUnits: PatternUnit[],
                   offset: number,
                   fn: (createdSchedule: WorkDay[],
                        updatedSchedule: WorkDay[]) => void) {
    const createdSchedule: WorkDay[] = [];
    const updatedSchedule: WorkDay[] = [];
    const datesSize = dates.length;
    const unitsSize = patternUnits.length;
    for (let i = 0; i < datesSize; i += unitsSize) {
      for (let j = 0; j < unitsSize; j++) {
        const date_index = i + j;
        if (date_index >= datesSize) {
          break;
        }
        const unit_index = (offset + j) % unitsSize;
        const workDay = schedule
          .find(this.getFindFunction(employeeId, dates[date_index]));
        if (workDay) {
          workDay.hours = patternUnits[unit_index].value;
          workDay.label = patternUnits[unit_index].label;
          updatedSchedule.push(workDay);
        } else {
          const newWorkDay = this.createWorkDay(
            employeeId,
            false,
            patternUnits[unit_index].value,
            this.getISODateString(dates[date_index]),
            patternUnits[unit_index].label);
          createdSchedule.push(newWorkDay);
        }
      }
    }
    fn(createdSchedule, updatedSchedule);
  }

  private getFindFunction(employeeId: number,
                          date: Date): any {
    return (item) =>
      item.employeeId === employeeId &&
      item.date === this.getISODateString(date);
  }

  private getISODateString(date: Date): string {
    return date.toISOString().split('T')[0];
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
