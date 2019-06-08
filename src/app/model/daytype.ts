import { IdEntity } from "./interface/id-entity";

export class DayType implements IdEntity {
  id: number;
  departmentId;
  name: string;
  label: string;
}
