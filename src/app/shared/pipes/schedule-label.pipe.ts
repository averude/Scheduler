import { Pipe, PipeTransform } from '@angular/core';
import { WorkDay } from '../../model/workday';
import { DayType } from "../../model/day-type";

@Pipe({
  name: 'scheduleLabel',
  pure: false
})
export class ScheduleLabelPipe implements PipeTransform {

  transform(value: WorkDay, dayTypes?: DayType[]): string | number {
    if (value) {
      if (value.dayTypeId && dayTypes) {
        let dayType = dayTypes.find(item => item.id === value.dayTypeId);
        if (dayType) {
          if (dayType.label.length > 0){
            return dayType.label;
          } else {
            return value.hours;
          }
        } else {
          return value.hours;
        }
      } else {
        return value.hours;
      }
    } else {
      return '-';
    }
  }
}
