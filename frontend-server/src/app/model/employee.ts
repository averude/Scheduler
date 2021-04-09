import { IdEntity } from "./interface/id-entity";
import { Position } from "./position";
import { HasDepartmentId } from "./interface/has-department-id";

export class Employee implements IdEntity, HasDepartmentId {
  id:           number;
  departmentId: number;
  firstName:    string;
  patronymic:   string;
  secondName:   string;
  position:     Position;
}
