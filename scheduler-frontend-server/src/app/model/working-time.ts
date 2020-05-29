import { IdEntity } from "./interface/id-entity";

export class WorkingTime implements IdEntity {
  id: number;
  // departmentId: number;
  shiftId: number;
  date: Date;
  hours: number;
}
