import { IdEntity } from "./interface/id-entity";

export class Employee implements IdEntity {
  id: number;
  firstName: string;
  patronymic: string;
  secondName: string;
  positionId: number;
  shiftId: number;
}
