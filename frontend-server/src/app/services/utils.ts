import { EmployeeScheduleDTO } from "../model/dto/employee-schedule-dto";

export function getMainShiftId(dto: EmployeeScheduleDTO) {

  const lastMainCompositionIndex = dto.mainShiftCompositions.length - 1;

  if (lastMainCompositionIndex >= 0) {
    return dto.mainShiftCompositions[lastMainCompositionIndex].shiftId;
  } else {
    const lastSubstitutionCompositionIndex = dto.substitutionShiftCompositions.length - 1;

    if (lastSubstitutionCompositionIndex >= 0) {
      return dto.substitutionShiftCompositions[lastSubstitutionCompositionIndex]
        .mainShiftComposition
        .shiftId;
    }
  }
}
