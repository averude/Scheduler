import { ReportSheet } from "../report-sheet";
import { IdEntity } from "../interface/id-entity";

export class ReportSheetDTO implements IdEntity {
  id: number;
  reportSheet: ReportSheet;
  shiftIds: number[];
}
