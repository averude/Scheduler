import { IdEntity } from "./interface/id-entity";

export class WorkingTime implements IdEntity {
  id: number;
  shiftId: number;
  date: Date;
  hours: number;
  days: number;
}
