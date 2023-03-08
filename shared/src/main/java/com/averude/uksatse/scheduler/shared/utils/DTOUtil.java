package com.averude.uksatse.scheduler.shared.utils;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.core.model.entity.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;

@Component
public class DTOUtil {

    public List<ShiftPatternDTO> createShiftPatternDTOList(List<ShiftPattern> patterns,
                                                           List<PatternUnit> patternUnits,
                                                           List<ShiftPatternGenerationRule> generationRules) {
        var result = new ArrayList<ShiftPatternDTO>(patterns.size());

        int lastUnitIndex = 0;
        int lastRuleIndex = 0;

        for (var pattern : patterns) {

            var dto = new ShiftPatternDTO(pattern, new ArrayList<>(), new ArrayList<>());

            lastUnitIndex = sequentialFill(pattern, patternUnits,
                    dto.getCollection(),lastUnitIndex,
                    ((shiftPattern, patternUnit) -> shiftPattern.getId() - patternUnit.getPatternId()));

            lastRuleIndex = sequentialFill(pattern, generationRules,
                    dto.getGenerationRules(), lastRuleIndex,
                    ((shiftPattern, patternUnit) -> shiftPattern.getId() - patternUnit.getShiftPatternId()));

            result.add(dto);
        }

        return result;
    }

    @Deprecated
    public List<EmployeeScheduleDTO> createEmployeeScheduleDTOList(List<Employee> employees,
                                                                   List<WorkDay> schedule) {
        var result = new ArrayList<EmployeeScheduleDTO>(employees.size());

        int lastScheduleIndex = 0;

        for (var e : employees) {

            var dto = new EmployeeScheduleDTO(e.getId(), null, null, new ArrayList<>());

            lastScheduleIndex = sequentialFill(e, schedule,
                    dto.getWorkDays(),lastScheduleIndex,
                    ((employee, workDay) -> employee.getId() - workDay.getEmployeeId()));

            result.add(dto);
        }

        return result;
    }

    public List<EmployeeScheduleDTO> createEmployeeScheduleDTOList(List<Employee> employees,
                                                                   List<MainComposition> mainCompositions,
                                                                   List<SubstitutionComposition> substitutionCompositions,
                                                                   List<WorkDay> schedule) {
        var result = new ArrayList<EmployeeScheduleDTO>(employees.size());

        int lastScheduleIndex = 0;
        int lastMainCompositionIndex = 0;
        int lastSubstitutionCompositionIndex = 0;

        for (var e : employees) {

            var dto = new EmployeeScheduleDTO(e.getId(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

            lastScheduleIndex = sequentialFill(e, schedule,
                    dto.getWorkDays(),lastScheduleIndex,
                    ((employee, workDay) -> employee.getId() - workDay.getEmployeeId()));

            lastMainCompositionIndex = sequentialFill(e, mainCompositions,
                    dto.getMainCompositions(), lastMainCompositionIndex,
                    ((employee, composition) -> employee.getId() - composition.getEmployeeId()));

            lastSubstitutionCompositionIndex = sequentialFill(e, substitutionCompositions,
                    dto.getSubstitutionCompositions(), lastSubstitutionCompositionIndex,
                    ((employee, composition) -> employee.getId() - composition.getEmployeeId()));

            result.add(dto);
        }

        return result;
    }

    private <T1, T2> int sequentialFill(T1 t1,
                                        List<T2> src,
                                        List<T2> dest,
                                        int startIndex,
                                        BiFunction<T1, T2, Long> comparator) {
        int collectionLastIndex = startIndex;
        for (int i = collectionLastIndex; i < src.size(); i++) {
            var srcValue = src.get(i);

            if (comparator.apply(t1, srcValue) == 0) {
                dest.add(srcValue);
                continue;
            }

            if (comparator.apply(t1, srcValue) < 0) {
                collectionLastIndex = i;
                break;
            }
        }
        return collectionLastIndex;
    }
}
