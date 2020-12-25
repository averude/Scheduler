import { ShiftPattern } from "../shift-pattern";
import { PatternUnit } from "../pattern-unit";
import { ShiftPatternGenerationRule } from "../shift-pattern-generation-rule";
import { BasicDto } from "./basic-dto";

export class ShiftPatternDTO extends BasicDto<ShiftPattern, PatternUnit> {
  generationRules: ShiftPatternGenerationRule[];
}
