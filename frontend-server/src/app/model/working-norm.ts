import { IdEntity } from "./interface/id-entity";
import { HasDate } from "./interface/has-date";

export class WorkingNorm implements IdEntity, HasDate {
  id: number;
  shiftId: number;
  date: Date;
  hours: number;
  days: number;
}
