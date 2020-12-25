import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";

export class ShiftPattern implements IdEntity, HasName {
  id:                     number;
  name:                   string;
}
