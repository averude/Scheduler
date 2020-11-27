import { Injectable } from "@angular/core";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../model/main-shift-composition";
import { Moment } from "moment";

@Injectable()
export class ShiftCompositionDivider {

  divideMainCompositionsByEmployee(mainShiftCompositions: MainShiftComposition[],
                                   substitutionCompositions: SubstitutionShiftComposition[]): Map<number, any[]> {
    let compositionsMap = new Map<number, any[]>();

    this.fillMap(compositionsMap, mainShiftCompositions, 0);
    this.fillMap(compositionsMap, substitutionCompositions, 1);

    compositionsMap.forEach((employeeCompositions) => this.divideValues(employeeCompositions));
    return compositionsMap;
  }

  private fillMap(compositionsMap: Map<number, any[]>,
              compositions: any[],
              valArrIdx: number) {
    for (let composition of compositions) {
      let value = compositionsMap.get(composition.employee.id);
      if (value && value[valArrIdx]) {
        value[valArrIdx].push(composition);
      } else {
        let newVal = [[],[]];
        newVal[valArrIdx] = [composition];
        compositionsMap.set(composition.employee.id, newVal);
      }
    }
  }

  private divideValues(employeeCompositions: any[][]) {
    // if (employeeCompositions[1] && employeeCompositions[1].length > 0) {
    //
    // }
    for (let i = 0; i < employeeCompositions[0].length; i++) {
      let mainComposition = employeeCompositions[0][i];
      employeeCompositions[0].splice(i, 1);
      let subCompositions = this.divide(mainComposition, employeeCompositions[1]);
      employeeCompositions[0] = employeeCompositions[0].concat(subCompositions);
    }
  }

  divide(mainShiftComposition: MainShiftComposition,
         substitutionShiftCompositions: SubstitutionShiftComposition[]) {
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
                            mainShiftComposition: MainShiftComposition): MainShiftComposition {
    let composition = new MainShiftComposition();
    composition.shiftId       = mainShiftComposition.shiftId;
    composition.employee      = mainShiftComposition.employee;
    composition.substitution  = mainShiftComposition.substitution;
    composition.from          = from;
    composition.to            = to;
    return composition;
  }
}
