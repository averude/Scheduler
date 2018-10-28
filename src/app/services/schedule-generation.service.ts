import { Injectable } from '@angular/core';
import { DayType } from '../model/daytype';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleByPatternId(employeeId: number,
                              schedule: Schedule[],
                              dates: Date[],
                              dayTypes: DayType[],
                              fn: (createdSchedule: Schedule[],
                                   updatedSchedule: Schedule[]) => void) {
    this.generate(employeeId, schedule, dates, dayTypes, 0, fn);
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  schedule: Schedule[],
                                  dates: Date[],
                                  hours: number,
                                  fn: (createdSchedule: Schedule[],
                                       updatedSchedule: Schedule[]) => void) {
    const dayType = new DayType();
    dayType.hours = hours;
    const customDayType: DayType[] = [dayType];
    this.generate(employeeId, schedule, dates, customDayType, 0, fn);
  }

  private generate(employeeId: number,
                   schedule: Schedule[],
                   dates: Date[],
                   dayTypes: DayType[],
                   offset: number,
                   fn: (createdSchedule: Schedule[],
                        updatedSchedule: Schedule[]) => void) {
    const createdSchedule: Schedule[] = [];
    const updatedSchedule: Schedule[] = [];
    const datesSize = dates.length;
    const typesSize = dayTypes.length;
    for (let i = 0; i < datesSize; i += typesSize) {
      for (let j = 0; j < typesSize; j++) {
        const date_index = i + j;
        if (date_index >= datesSize) {
          break;
        }
        const type_index = (offset + j) % typesSize;
        const workDay = schedule
          .find(this.getFindFunction(employeeId, dates[date_index]));
        if (workDay) {
          workDay.hours = dayTypes[type_index].hours;
          workDay.label = dayTypes[type_index].label;
          updatedSchedule.push(workDay);
        } else {
          const newWorkDay = this.createSchedule(
            employeeId,
            false,
            dayTypes[type_index].hours,
            this.getISODateString(dates[date_index]),
            dayTypes[type_index].label);
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

  private createSchedule(employeeId: number,
                         holiday: boolean,
                         hours: number,
                         date: string,
                         label: string): Schedule {
    const schedule = new Schedule();
    schedule.employeeId = employeeId;
    schedule.holiday = holiday;
    schedule.hours = hours;
    schedule.date = date;
    schedule.label = label;
    return schedule;
  }
}
