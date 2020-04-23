import { IdEntity } from "../interface/id-entity";
import { ShiftPattern } from "../shift-pattern";
import { PatternUnit } from "../pattern-unit";
import { Employee } from "../employee";
import { WorkDay } from "../workday";

export class BasicDto<E, C>{
  entity:     E;
  collection: C[];
}

export class ShiftPatternDto extends BasicDto<ShiftPattern, PatternUnit> implements IdEntity {
  get id(): number {
    return this.entity.id;
  }
}

export class EmployeeScheduleDto extends BasicDto<Employee, WorkDay> {

}
