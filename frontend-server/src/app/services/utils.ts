import { EmployeeScheduleDTO } from "../model/dto/employee-schedule-dto";

export function getMainShiftId(dto: EmployeeScheduleDTO) {

  const lastMainCompositionIndex = dto.mainCompositions.length - 1;

  if (lastMainCompositionIndex >= 0) {
    return dto.mainCompositions[lastMainCompositionIndex].shiftId;
  } else {
    const lastSubstitutionCompositionIndex = dto.substitutionCompositions.length - 1;

    if (lastSubstitutionCompositionIndex >= 0) {
      return dto.substitutionCompositions[lastSubstitutionCompositionIndex]
        .mainComposition
        .shiftId;
    }
  }
}
