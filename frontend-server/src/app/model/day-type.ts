import { IdEntity } from "./interface/id-entity";
import { DayTypeGroup } from "./day-type-group";
import { HasName } from "./interface/has-name";
import { HasEnterpriseId } from "./interface/has-enterprise-id";

export class DayType implements IdEntity, HasName, HasEnterpriseId {
  id:               number;
  enterpriseId:     number;
  dayTypeGroup:     DayTypeGroup;
  name:             string;
  label:            string;
  reportLabel:      string;
  usePreviousValue: boolean;
}
