import { Injectable } from "@angular/core";
import { ShiftComposition } from "../../model/shift-composition";
import * as moment from "moment";
import { Moment } from "moment";

@Injectable()
export class ShiftCompositionDivider {

  divide(mainShiftComposition: ShiftComposition,
         substitutionShiftCompositions: ShiftComposition[]): ShiftComposition[] {
    let mainCompositions: ShiftComposition[] = [];

    this.divideRecursively(mainShiftComposition,
      mainCompositions,
      moment(mainShiftComposition.from),
      moment(mainShiftComposition.to),
      substitutionShiftCompositions);

    return mainCompositions;
  }

  private divideRecursively(mainShiftComposition: ShiftComposition,
                            mainCompositionChunks: ShiftComposition[],
                            from: Moment,
                            to: Moment,
                            substitutionShiftCompositions: ShiftComposition[]) {
    if (from.isSameOrAfter(to)) {
      return;
    }

    if (substitutionShiftCompositions.length <= 0) {
      let composition = this.createComposition(from, to, mainShiftComposition);
      mainCompositionChunks.push(composition);
      return;
    }

    let substComp = substitutionShiftCompositions.shift();
    let substFrom = moment(substComp.from);

    if (from.isBefore(substFrom)) {
      let composition = this.createComposition(from,
        substFrom.subtract(1, 'day'), mainShiftComposition);
      mainCompositionChunks.push(composition);
    }

    this.divideRecursively(mainShiftComposition,
      mainCompositionChunks,
      moment(substComp.to).add(1, 'day'), to,
      substitutionShiftCompositions);
  }

  private createComposition(from: Moment,
                            to: Moment,
                            mainShiftComposition: ShiftComposition): ShiftComposition {
    let composition = new ShiftComposition();
    composition.shiftId       = mainShiftComposition.shiftId;
    composition.employeeId    = mainShiftComposition.employeeId;
    composition.substitution  = mainShiftComposition.substitution;
    composition.from          = from.format("YYYY-MM-DD");
    composition.to            = to.format('YYYY-MM-DD');
    return composition;
  }
}
