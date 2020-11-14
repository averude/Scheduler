import { Shift } from "../../../model/shift";
import * as moment from "moment";
import { GenerationDto } from "../../../model/dto/generation-dto";
import { ShiftGenerationUnit } from "../../../model/ui/shift-generation-unit";

export function getGenerationUnits(shifts: Shift[]) {
  return shifts
    .filter(shift => shift.shiftPattern)
    .map(shift => {
      return {
        shift: shift,
        offset: 0,
        from: moment.utc().startOf("year"),
        to: moment.utc().endOf("year")
      }
  });
}

export function toGenerationDto(shiftGenerationUnit: ShiftGenerationUnit): GenerationDto {
  return {
    shiftId: shiftGenerationUnit.shift.id,
    offset: shiftGenerationUnit.offset,
    from: shiftGenerationUnit.from.format("YYYY-MM-DD"),
    to: shiftGenerationUnit.to.format("YYYY-MM-DD")
  }
}

export const DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
