import { IdEntity } from "./interface/id-entity";

export class Department implements IdEntity {
  id: number;
  iconId: number;
  name: string;
}
