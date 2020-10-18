import { IdEntity } from "./interface/id-entity";

export class WorkingNorm implements IdEntity {
  id: number;
  shiftId: number;
  date: Date;
  hours: number;
  days: number;
}
