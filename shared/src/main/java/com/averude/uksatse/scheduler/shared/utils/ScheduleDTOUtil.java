package com.averude.uksatse.scheduler.shared.utils;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ScheduleDTOUtil {

    public void fillDTOs(List<BasicDto<Employee, WorkDay>> dtos,
                         List<WorkDay> schedule) {

        int lastIdx = 0;

        for (var dto : dtos) {
            var employee = dto.getParent();

            for (int i = lastIdx; i < schedule.size(); i++) {

                var workDay = schedule.get(i);

                if (employee.getId().equals(workDay.getEmployeeId())) {
                    dto.getCollection().add(workDay);
                    continue;
                }

                if (employee.getId() < workDay.getEmployeeId()) {
                    lastIdx = i;
                    break;
                }
            }

        }
    }
}
