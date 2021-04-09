import { Moment } from "moment";
import { IdEntity } from "./interface/id-entity";
import { HasDepartmentId } from "./interface/has-department-id";

export interface HasDuration {
  from: any;
  to:   any;
}

export interface Composition extends HasDuration, HasDepartmentId {
  id:                   number;
  departmentId:         number;
  shiftId:              number;
  employeeId:           number;
  positionId:           number;
  from:                 Moment;
  to:                   Moment;
}

export class MainComposition implements IdEntity, Composition {
  id:                   number;
  departmentId:         number;
  shiftId:              number;
  employeeId:           number;
  positionId:           number;
  from:                 Moment;
  to:                   Moment;
}

export class SubstitutionComposition implements IdEntity, Composition {
  id:                   number;
  departmentId:         number;
  shiftId:              number;
  employeeId:           number;
  mainComposition:      MainComposition;
  positionId:           number;
  from:                 Moment;
  to:                   Moment;
}

export function equals(a: Composition, b: Composition) {
  return a && b &&
    a.id === b.id &&
    a.departmentId === b.departmentId &&
    a.shiftId === b.shiftId &&
    a.employeeId === b.employeeId &&
    a.positionId === b.positionId &&
    a.from.isSame(b.from) &&
    a.to.isSame(b.to);
}
