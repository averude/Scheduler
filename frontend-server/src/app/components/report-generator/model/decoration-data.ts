import { ReportSheetParticipant } from "../../../model/report-sheet";

export class DecorationData {
  year: number;
  month: string;
  agreed: HeaderSectionData;
  approved: HeaderSectionData;
}

export interface HeaderSectionData extends ReportSheetParticipant {
  label: string;
  year: number
}
