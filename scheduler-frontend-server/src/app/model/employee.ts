import { IdEntity } from "./interface/id-entity";
import { Position } from "./position";

export class Employee implements IdEntity {
  id: number;
  firstName: string;
  patronymic: string;
  secondName: string;
  position: Position;
}
