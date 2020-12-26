package com.averude.uksatse.scheduler.core.dto;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
import com.averude.uksatse.scheduler.core.entity.SubstitutionShiftComposition;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EmployeeScheduleDTO extends BasicDto<Employee, WorkDay> {
    private List<MainShiftComposition> mainShiftCompositions;
    private List<SubstitutionShiftComposition> substitutionShiftCompositions;

    public EmployeeScheduleDTO(Employee parent,
                               List<WorkDay> collection,
                               List<MainShiftComposition> mainShiftCompositions,
                               List<SubstitutionShiftComposition> substitutionShiftCompositions) {
        super(parent, collection);
        this.mainShiftCompositions = mainShiftCompositions;
        this.substitutionShiftCompositions = substitutionShiftCompositions;
    }
}
