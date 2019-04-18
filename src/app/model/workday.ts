import { IdEntity } from "./interface/id-entity";

export class WorkDay implements IdEntity {
  id: number;
  employeeId: number;
  dayTypeId: number;
  holiday: boolean;
  hours: number;
  label: string;
  date: string;
}
