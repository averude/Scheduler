import { Moment } from "moment";
import { Employee } from "./employee";
import { IdEntity } from "./interface/id-entity";

export interface HasDuration {
  from: any;
  to:   any;
}

export interface Composition extends HasDuration {
  id:                   number;
  shiftId:              number;
  employee:             Employee;
  from:                 Moment;
  to:                   Moment;
}

export class MainShiftComposition implements IdEntity, Composition {
  id:                   number;
  shiftId:              number;
  employee:             Employee;
  from:                 Moment;
  to:                   Moment;
}

export class SubstitutionShiftComposition implements IdEntity, Composition {
  id:                   number;
  shiftId:              number;
  employee:             Employee;
  mainShiftComposition: MainShiftComposition;
  from:                 Moment;
  to:                   Moment;
}

export function equals(a: Composition, b: Composition) {
  return a && b &&
    a.id === b.id &&
    a.shiftId === b.shiftId &&
    a.employee.id === b.employee.id &&
    a.from.isSame(b.from) &&
    a.to.isSame(b.to);
}
