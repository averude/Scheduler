import { ShiftPattern } from "../shift-pattern";
import { PatternUnit } from "../pattern-unit";
import { ShiftPatternGenerationRule } from "../shift-pattern-generation-rule";
import { BasicDTO } from "./basic-dto";

export class ShiftPatternDTO extends BasicDTO<ShiftPattern, PatternUnit> {
  generationRules: ShiftPatternGenerationRule[];
}
