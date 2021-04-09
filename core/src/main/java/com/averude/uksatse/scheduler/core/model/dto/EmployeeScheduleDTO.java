package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.core.model.entity.MainComposition;
import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EmployeeScheduleDTO extends BasicDto<Employee, WorkDay> {
    private List<MainComposition> mainCompositions;
    private List<SubstitutionComposition> substitutionCompositions;

    public EmployeeScheduleDTO(Employee parent,
                               List<WorkDay> collection,
                               List<MainComposition> mainCompositions,
                               List<SubstitutionComposition> substitutionCompositions) {
        super(parent, collection);
        this.mainCompositions = mainCompositions;
        this.substitutionCompositions = substitutionCompositions;
    }
}
