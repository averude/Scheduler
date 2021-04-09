import { Moment } from "moment";
import { MainComposition } from "../../composition";

export class RowInterval {
  parentId:   number;
  from:       Moment;
  to:         Moment;
}

export function convertCompositionToInterval(composition: MainComposition): RowInterval {
  return {parentId: composition.id, from: composition.from, to: composition.to};
}
