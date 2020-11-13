import { Injectable } from "@angular/core";
import { ShiftComposition } from "../../model/shift-composition";
import { Moment } from "moment";

@Injectable()
export class ShiftCompositionDivider {

  divideMainCompositionsByEmployee(shiftCompositions: ShiftComposition[]): Map<number, any[]> {
    let compositionsMap = new Map<number, any[]>();

    for (let composition of shiftCompositions) {
      let value = compositionsMap.get(composition.employee.id);
      if (value) {
        value.push(composition);
      } else {
        compositionsMap.set(composition.employee.id, [composition]);
      }
    }

    compositionsMap.forEach((employeeCompositions, employeeId, map) => {
      let result: any[] = [[],[]];

      for (let composition of employeeCompositions) {
        if (composition.substitution) {
          result[1].push(composition);
        } else {
          result[0].push(composition);
        }
      }

      for (let i = 0; i < result[0].length; i++) {
        let mainComposition = result[0][i];
        result[0].splice(i, 1);
        let subCompositions = this.divide(mainComposition, result[1]);
        result[0] = result[0].concat(subCompositions);
      }

      map.set(employeeId, result);
    });

    return compositionsMap;
  }

  divide(mainShiftComposition: ShiftComposition,
         substitutionShiftCompositions: ShiftComposition[]) {
    let result = [];

    let from  = mainShiftComposition.from;
    let to    = mainShiftComposition.to;

    let substCount = substitutionShiftCompositions.length;

    for (let i = 0; i <= substCount; i++) {

      if (i >= substCount) {
        let composition = this.createComposition(from, to, mainShiftComposition);
        result.push(composition);
        break;
      }

      let substitutionComposition = substitutionShiftCompositions[i];

      if (from.isAfter(substitutionComposition.from)) {
        if (substitutionComposition.to.isBefore(to)) {
          from = substitutionComposition.to.clone().add(1, 'day');
          continue;
        } else {
          break;
        }
      }

      if (to.isAfter(substitutionComposition.from)) {
        let composition = this.createComposition(from,
          substitutionComposition.from.clone().subtract(1, 'day'), mainShiftComposition);
        result.push(composition);
        from = substitutionComposition.to.clone().add(1, 'day');
      } else {
        let composition = this.createComposition(from, to, mainShiftComposition);
        result.push(composition);
        break;
      }
    }

    return result;
  }

  private createComposition(from: Moment,
                            to: Moment,
                            mainShiftComposition: ShiftComposition): ShiftComposition {
    let composition = new ShiftComposition();
    composition.shiftId       = mainShiftComposition.shiftId;
    composition.employee      = mainShiftComposition.employee;
    composition.substitution  = mainShiftComposition.substitution;
    composition.from          = from;
    composition.to            = to;
    return composition;
  }
}
