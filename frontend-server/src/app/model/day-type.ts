import { IdEntity } from "./interface/id-entity";
import { DayTypeGroup } from "./day-type-group";

export class DayType implements IdEntity {
  id:               number;
  dayTypeGroup:     DayTypeGroup;
  name:             string;
  label:            string;
  usePreviousValue: boolean;
}
