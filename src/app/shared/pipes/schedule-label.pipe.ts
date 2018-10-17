import { Pipe, PipeTransform } from '@angular/core';
import { Schedule } from '../../model/schedule';

@Pipe({
  name: 'scheduleLabel',
  pure: false
})
export class ScheduleLabelPipe implements PipeTransform {

  transform(value: Schedule): string | number {
    if (value) {
      if (value.label) {
        return value.label;
      } else {
        return value.hours;
      }
    } else {
      return 0;
    }
  }
}
