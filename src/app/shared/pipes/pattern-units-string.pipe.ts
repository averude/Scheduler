import { Pipe, PipeTransform } from "@angular/core";
import { PatternUnit } from "../../model/pattern-unit";

@Pipe({
  name: 'patternUnitStringImpure',
  pure: false
})
export class PatternUnitsStringPipe implements PipeTransform{
  transform(units: PatternUnit[]): any {
    let result = '';
    if (!units) {
      return result;
    }
    for (let i = 0; i < units.length; i++) {
      result += units[i].value;
      if (i != units.length - 1) {
        result += ' ➢ ';
      }
    }
    return result;
  }
}
