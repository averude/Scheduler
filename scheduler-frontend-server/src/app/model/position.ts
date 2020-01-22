import { IdEntity } from "./interface/id-entity";

export class Position implements IdEntity {
  id: number;
  departmentId: number;
  name: string;
  shortName: string;
}
