package com.averude.uksatse.scheduler.shared.utils;

import com.averude.uksatse.scheduler.core.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
import com.averude.uksatse.scheduler.core.entity.SubstitutionShiftComposition;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.function.BiFunction;

@Component
public class ScheduleDTOUtil {

    public List<EmployeeScheduleDTO> createEmployeeScheduleDTOList(List<Employee> employees,
                                                                   List<MainShiftComposition> mainShiftCompositions,
                                                                   List<SubstitutionShiftComposition> substitutionShiftCompositions,
                                                                   List<WorkDay> schedule) {
        var result = new LinkedList<EmployeeScheduleDTO>();

        int lastScheduleIndex = 0;
        int lastMainCompositionIndex = 0;
        int lastSubstitutionCompositionIndex = 0;

        for (var e : employees) {

            var dto = new EmployeeScheduleDTO(e, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

            lastScheduleIndex = sequentialFill(e, schedule,
                    dto.getCollection(),lastScheduleIndex,
                    ((employee, workDay) -> employee.getId() - workDay.getEmployeeId()));

            lastMainCompositionIndex = sequentialFill(e, mainShiftCompositions,
                    dto.getMainShiftCompositions(), lastMainCompositionIndex,
                    ((employee, composition) -> employee.getId() - composition.getEmployee().getId()));

            lastSubstitutionCompositionIndex = sequentialFill(e, substitutionShiftCompositions,
                    dto.getSubstitutionShiftCompositions(), lastSubstitutionCompositionIndex,
                    ((employee, composition) -> employee.getId() - composition.getEmployee().getId()));

            result.add(dto);
        }

        return result;
    }

    private <T1, T2> int sequentialFill(T1 t1,
                                        List<T2> src,
                                        List<T2> dest,
                                        int lastIdx,
                                        BiFunction<T1, T2, Long> comparator) {
        int collectionLastIndex = lastIdx;
        for (int i = collectionLastIndex; i < src.size(); i++) {
            var composition = src.get(i);

            if (comparator.apply(t1, composition) == 0) {
                dest.add(composition);
                continue;
            }

            if (comparator.apply(t1, composition) < 0) {
                collectionLastIndex = i;
                break;
            }
        }
        return collectionLastIndex;
    }
}
