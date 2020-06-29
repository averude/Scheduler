import { IdEntity } from "./interface/id-entity";
import { ShiftPattern } from "./shift-pattern";

export class Shift implements IdEntity {
  id: number;
  name: string;
  shiftPattern: ShiftPattern;
}
