import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'monthNameImpure',
  pure: false
})
export class MonthNameImpurePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(date: Date, locale?: string): string | null {
    return date.toLocaleDateString(locale, {month: 'long'});
  }
}
