import { Moment } from "moment";
import { MainShiftComposition } from "../../main-shift-composition";

export class RowInterval {
  parentId:   number;
  from:       Moment;
  to:         Moment;
}

export function convertCompositionToInterval(composition: MainShiftComposition): RowInterval {
  return {parentId: composition.id, from: composition.from, to: composition.to};
}
