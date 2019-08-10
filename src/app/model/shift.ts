import { IdEntity } from "./interface/id-entity";

export class Shift implements IdEntity {
  id: number;
  name: string;
  departmentId: number;
  patternId: number;
}
