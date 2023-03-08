package com.averude.uksatse.scheduler.core.model.dto;

import com.averude.uksatse.scheduler.core.model.entity.MainComposition;
import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class EmployeeScheduleDTO {

    private Long employeeId;
    private List<MainComposition> mainCompositions;
    private List<SubstitutionComposition> substitutionCompositions;
    private List<WorkDay> workDays;

}
