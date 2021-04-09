import { IdEntity } from "./interface/id-entity";
import { HasName } from "./interface/has-name";
import { HasEnterpriseId } from "./interface/has-enterprise-id";

export class SummationColumn implements IdEntity, HasName, HasEnterpriseId {
  id:           number;
  enterpriseId: number;
  name:         string;
  onlyHolidays: boolean;
  columnType:   SummationType;
  specialCalendarDateTypes: string[];
}

export enum SummationType {
  COUNT = "count",
  HOURS_SUM = "hours_sum"
}

export const SUMMATION_COLUMN_TYPES: string[] = [SummationType.COUNT, SummationType.HOURS_SUM];
