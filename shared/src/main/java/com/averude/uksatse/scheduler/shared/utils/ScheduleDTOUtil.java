package com.averude.uksatse.scheduler.shared.utils;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.core.model.entity.MainComposition;
import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.function.BiFunction;

@Component
public class ScheduleDTOUtil {

    public List<EmployeeScheduleDTO> createEmployeeScheduleDTOList(List<Employee> employees,
                                                                   List<WorkDay> schedule) {
        var result = new LinkedList<EmployeeScheduleDTO>();

        int lastScheduleIndex = 0;

        for (var e : employees) {

            var dto = new EmployeeScheduleDTO(e, new ArrayList<>(), null, null);

            lastScheduleIndex = sequentialFill(e, schedule,
                    dto.getCollection(),lastScheduleIndex,
                    ((employee, workDay) -> employee.getId() - workDay.getEmployeeId()));

            result.add(dto);
        }

        return result;
    }

    public List<EmployeeScheduleDTO> createEmployeeScheduleDTOList(List<Employee> employees,
                                                                   List<MainComposition> mainCompositions,
                                                                   List<SubstitutionComposition> substitutionCompositions,
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
