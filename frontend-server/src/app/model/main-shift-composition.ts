import { Moment } from "moment";
import { IdEntity } from "./interface/id-entity";

export interface HasDuration {
  from: any;
  to:   any;
}

export interface Composition extends HasDuration {
  id:                   number;
  shiftId:              number;
  employeeId:           number;
  positionId:           number;
  from:                 Moment;
  to:                   Moment;
}

export class MainShiftComposition implements IdEntity, Composition {
  id:                   number;
  shiftId:              number;
  employeeId:           number;
  positionId:           number;
  from:                 Moment;
  to:                   Moment;
}

export class SubstitutionShiftComposition implements IdEntity, Composition {
  id:                   number;
  shiftId:              number;
  employeeId:           number;
  mainShiftComposition: MainShiftComposition;
  positionId:           number;
  from:                 Moment;
  to:                   Moment;
}

export function equals(a: Composition, b: Composition) {
  return a && b &&
    a.id === b.id &&
    a.shiftId === b.shiftId &&
    a.employeeId === b.employeeId &&
    a.positionId === b.positionId &&
    a.from.isSame(b.from) &&
    a.to.isSame(b.to);
}
