import { IdEntity } from "./interface/id-entity";

export class ReportSheet implements IdEntity {
  id:       number;
  name:     string;
  caption:  string;
  creators: ReportSheetParticipant[];
  approved: ReportSheetParticipant;
  agreed:   ReportSheetParticipant;
}

export class ReportSheetParticipant {
  position: string;
  name: string;
}
