import { DepartmentDayType } from "../../department-day-type";
import { BasicDTO } from "../basic-dto";
import { ShiftPattern } from "../../shift-pattern";
import { PatternUnit } from "../../pattern-unit";
import { RatioColumn } from "../../ratio-column";

export class AdminCommonDataDTO {
  departmentDayTypes: DepartmentDayType[];
  patternDTOs:        BasicDTO<ShiftPattern, PatternUnit>[];
  ratioColumns:       RatioColumn[];
}
