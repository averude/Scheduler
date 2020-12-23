import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";

export class DayTypeGroup implements IdEntity, HasName {
  id: number;
  name: string;
  color: string;
}
