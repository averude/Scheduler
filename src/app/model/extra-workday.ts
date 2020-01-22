import { IdEntity } from "./interface/id-entity";

export class ExtraWorkDay implements IdEntity {
  id: number;
  departmentId: number;
  extraWeekendId: number;
  date: Date;
}
