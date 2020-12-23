import { IdEntity } from "./interface/id-entity";
import { DayTypeGroup } from "./day-type-group";
import { HasName } from "./interface/has-name";

export class DayType implements IdEntity, HasName {
  id:               number;
  dayTypeGroup:     DayTypeGroup;
  name:             string;
  label:            string;
  usePreviousValue: boolean;
}
