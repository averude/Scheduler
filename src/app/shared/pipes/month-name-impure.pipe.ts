import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'monthNameImpure',
  pure: false
})
export class MonthNameImpurePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(date: Date | number, locale?: string): string | null {
    if (date instanceof Date) {
      return date.toLocaleDateString(locale, {month: 'long'});
    } else if (isNumber(date)) {
      return new Date(Date.UTC(0, date, 1))
        .toLocaleString(locale, {month: 'long'});
    }
  }
}
