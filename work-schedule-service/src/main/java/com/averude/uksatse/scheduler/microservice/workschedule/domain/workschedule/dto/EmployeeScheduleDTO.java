package com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.dto;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.entity.MainComposition;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.entity.WorkDay;
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
