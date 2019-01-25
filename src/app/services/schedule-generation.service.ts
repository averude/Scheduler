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
                              patternTokens: PatternUnit[],
                              fn: (createdSchedule: WorkDay[],
                                   updatedSchedule: WorkDay[]) => void) {
    this.generate(employeeId, schedule, dates, patternTokens, 0, fn);
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  schedule: WorkDay[],
                                  dates: Date[],
                                  hours: number,
                                  fn: (createdSchedule: WorkDay[],
                                       updatedSchedule: WorkDay[]) => void) {
    const patternToken = new PatternUnit();
    patternToken.value = hours;
    const customTokens: PatternUnit[] = [patternToken];
    this.generate(employeeId, schedule, dates, customTokens, 0, fn);
  }

  private generate(employeeId: number,
                   schedule: WorkDay[],
                   dates: Date[],
                   patternTokens: PatternUnit[],
                   offset: number,
                   fn: (createdSchedule: WorkDay[],
                        updatedSchedule: WorkDay[]) => void) {
    const createdSchedule: WorkDay[] = [];
    const updatedSchedule: WorkDay[] = [];
    const datesSize = dates.length;
    const tokensSize = patternTokens.length;
    for (let i = 0; i < datesSize; i += tokensSize) {
      for (let j = 0; j < tokensSize; j++) {
        const date_index = i + j;
        if (date_index >= datesSize) {
          break;
        }
        const token_index = (offset + j) % tokensSize;
        const workDay = schedule
          .find(this.getFindFunction(employeeId, dates[date_index]));
        if (workDay) {
          workDay.hours = patternTokens[token_index].value;
          workDay.label = patternTokens[token_index].label;
          updatedSchedule.push(workDay);
        } else {
          const newWorkDay = this.createWorkDay(
            employeeId,
            false,
            patternTokens[token_index].value,
            this.getISODateString(dates[date_index]),
            patternTokens[token_index].label);
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
