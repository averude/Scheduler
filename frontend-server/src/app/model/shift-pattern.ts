import { IdEntity } from "./interface/id-entity";
import { DepartmentDayType } from "./department-day-type";
import { HasName } from "./interface/has-name";

export class ShiftPattern implements IdEntity, HasName {
  id:                     number;
  name:                   string;
  holidayDepDayType:      DepartmentDayType;
  extraWeekendDepDayType: DepartmentDayType;
  extraWorkDayDepDayType: DepartmentDayType;
}
