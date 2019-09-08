import { Injectable } from '@angular/core';
import { PatternUnit } from '../model/pattern-unit';
import { WorkDay } from '../model/workday';
import { CalendarDay } from "../model/ui/calendar-day";
import { DayType } from "../model/day-type";
import { createOrUpdateWorkDay, findWorkingDay } from "../shared/utils/schedule-generation-utils";

@Injectable({
  providedIn: 'root'
})
export class ScheduleGenerationService {

  constructor() { }

  generateScheduleWithPattern(employeeId: number,
                              schedule: WorkDay[],
                              days: CalendarDay[],
                              patternUnits: PatternUnit[],
                              offset: number,
                              overrideExistingValues: boolean,
                              onSave: (createdSchedule: WorkDay[],
                                        updatedSchedule: WorkDay[]) => void,
                              onError: (message: string) => void) {
    this.generate(employeeId, schedule, days, patternUnits, offset, overrideExistingValues, onSave, onError);
  }

  generateScheduleWithCustomHours(employeeId: number,
                                  schedule: WorkDay[],
                                  days: CalendarDay[],
                                  hours: number,
                                  onSave: (createdSchedule: WorkDay[],
                                           updatedSchedule: WorkDay[]) => void,
                                  onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(employeeId, schedule, days, customUnits, 0, true,  onSave, onError);
  }

  generateScheduleBySingleDay(employeeId: number,
                              schedule: WorkDay[],
                              days: CalendarDay[],
                              hours: number,
                              dayType: DayType,
                              onSave: (createdSchedule: WorkDay[],
                                       updatedSchedule: WorkDay[]) => void,
                              onError: (message: string) => void) {
    const patternUnit = new PatternUnit();
    patternUnit.value = hours;
    patternUnit.dayTypeId = dayType.id;
    const customUnits: PatternUnit[] = [patternUnit];

    this.generate(employeeId, schedule, days, customUnits, 0, true, onSave, onError);
  }

  private generate(employeeId: number,
                   schedule: WorkDay[],
                   days: CalendarDay[],
                   patternUnits: PatternUnit[],
                   offset: number,
                   overrideExistingValues: boolean,
                   onSave: (createdSchedule: WorkDay[],
                            updatedSchedule: WorkDay[]) => void,
                   onError: (message: string) => void) {
    if (!schedule || !days || !patternUnits || !(patternUnits.length > 0)) {
      onError('Illegal arguments');
      return;
    }

    schedule = schedule
      .filter(workDay => days.map(day => day.isoString)
        .includes(workDay.date));

    if (!overrideExistingValues) {
      if (schedule.length !== days.length) {
        onError('Selected dates doesn\'t have _schedule');
        return;
      }
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
        const workDay = findWorkingDay(schedule, employeeId, days[date_index]);

        createOrUpdateWorkDay(
          overrideExistingValues,
          employeeId,
          workDay,
          patternUnits[unit_index],
          days[date_index],
          createdSchedule,
          updatedSchedule
        );
      }
    }
    onSave(createdSchedule, updatedSchedule);
  }
}
