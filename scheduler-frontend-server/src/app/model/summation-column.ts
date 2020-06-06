import { IdEntity } from "./interface/id-entity";

export class SummationColumn implements IdEntity {
  id:           number;
  name:         string;
  onlyHolidays: boolean;
}
