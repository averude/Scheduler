import { IdEntity } from "./interface/id-entity";

export class PatternUnit implements IdEntity {
  id: number;
  patternId: number;
  orderId: number;
  dayTypeId: number;
  label: string;
  value: number;
}
