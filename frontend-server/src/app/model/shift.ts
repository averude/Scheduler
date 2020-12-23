import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";

export class Shift implements IdEntity, HasName {
  id: number;
  name: string;
  shiftPatternId: number;
}
