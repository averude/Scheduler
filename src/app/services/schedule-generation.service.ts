import { Injectable } from '@angular/core';
import { PatternService } from './pattern.service';
import { DayType } from '../model/daytype';
import { ScheduleService } from './schedule.service';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor(private patternService: PatternService,
              private scheduleService: ScheduleService) { }

  generateScheduleByPatternId(employeeId: number,
                              schedule: Schedule[],
                              dates: Date[],
                              patternId: number) {
    this.patternService.getDayTypes(patternId)
      .subscribe(dayTypes => {
        this.generate(employeeId, schedule, dates, dayTypes, 0);
      });
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  schedule: Schedule[],
                                  dates: Date[],
                                  hours: string) {
    const customDayType: DayType[] = [{
      id: 0,
      patternId: 0,
      orderId: 0,
      label: null,
      hours: parseFloat(hours)
    }];
    this.generate(employeeId, schedule, dates, customDayType, 0);
  }

  private generate(employeeId: number,
                   schedule: Schedule[],
                   dates: Date[],
                   dayTypes: DayType[],
                   offset: number) {
    const datesSize = dates.length;
    const typesSize = dayTypes.length;
    for (let i = 0; i < datesSize; i += typesSize) {
      for (let j = 0; j < typesSize; j++) {
        const date_index = i + j;
        if (date_index >= datesSize) {
          break;
        }
        const type_index = (offset + j) % typesSize;
        const workDay = schedule.find(item =>
          item.employeeId === employeeId &&
          item.date.getTime() === dates[date_index].getTime());
        if (workDay !== undefined && workDay !== null) {
          workDay.hours = dayTypes[type_index].hours;
          workDay.label = dayTypes[type_index].label;
          // and then call {this.scheduleService.update}
        } else {
          schedule.push({
            id: 0,
            employeeId: employeeId,
            holiday: false,
            hours: dayTypes[type_index].hours,
            date: dates[date_index],
            label: dayTypes[type_index].label
          });
          // and then call {this.scheduleService.create}
        }
      }
    }
  }
}
