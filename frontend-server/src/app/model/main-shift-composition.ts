import { Moment } from "moment";
import { Employee } from "./employee";
import { IdEntity } from "./interface/id-entity";

export interface HasDuration {
  from: any;
  to:   any;
}

export class MainShiftComposition implements IdEntity, HasDuration {
  id:                   number;
  shiftId:              number;
  employee:             Employee;
  from:                 Moment;
  to:                   Moment;
}

export class SubstitutionShiftComposition implements IdEntity, HasDuration {
  id:                   number;
  shiftId:              number;
  employee:             Employee;
  mainShiftComposition: MainShiftComposition;
  from:                 Moment;
  to:                   Moment;
}
