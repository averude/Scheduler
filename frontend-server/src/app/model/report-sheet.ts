import { IdEntity } from "./interface/id-entity";
import { HasDepartmentId } from "./interface/has-department-id";

export class ReportSheet implements IdEntity, HasDepartmentId {
  id:           number;
  departmentId: number;
  name:         string;
  caption:      string;
  creators:     ReportSheetParticipant[];
  approved:     ReportSheetParticipant;
  agreed:       ReportSheetParticipant;
}

export class ReportSheetParticipant {
  position: string;
  name: string;
}
