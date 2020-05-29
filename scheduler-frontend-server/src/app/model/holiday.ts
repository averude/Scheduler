import { IdEntity } from "./interface/id-entity";

export class Holiday implements IdEntity {
  id: number;
  // departmentId: number;
  // date: Date;
  date: string;
  name: string;
}
