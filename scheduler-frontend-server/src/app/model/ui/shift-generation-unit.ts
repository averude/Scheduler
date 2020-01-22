import { Moment } from "moment";
import { Shift } from "../shift";
import { ScheduleGenerationDto } from "../dto/schedule-generation-dto";

export interface ShiftGenerationUnit {
  shift: Shift;
  offset: number;
  from: Moment;
  to: Moment;
}

export function toScheduleGenerationDto(shiftGenerationUnit: ShiftGenerationUnit): ScheduleGenerationDto {
  return {
    shiftId: shiftGenerationUnit.shift.id,
    offset: shiftGenerationUnit.offset,
    from: shiftGenerationUnit.from.format("YYYY-MM-DD"),
    to: shiftGenerationUnit.to.format("YYYY-MM-DD")
  }
}
