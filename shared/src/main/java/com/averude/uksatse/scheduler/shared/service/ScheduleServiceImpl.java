package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEmployeeId;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.entity.*;
import com.averude.uksatse.scheduler.core.util.CollectionUtils;
import com.averude.uksatse.scheduler.shared.repository.MainCompositionRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.repository.SubstitutionCompositionRepository;
import com.averude.uksatse.scheduler.shared.repository.WorkScheduleViewRepository;
import com.averude.uksatse.scheduler.shared.repository.common.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import com.averude.uksatse.scheduler.shared.utils.DTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class ScheduleServiceImpl
        extends AService<WorkDay, Long> implements ScheduleService {

    private final DTOUtil dtoUtil;

    private final ScheduleRepository    scheduleRepository;
    private final EmployeeRepository    employeeRepository;

    private final WorkScheduleViewRepository        workScheduleViewRepository;
    private final MainCompositionRepository         mainCompositionRepository;
    private final SubstitutionCompositionRepository substitutionCompositionRepository;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               EmployeeRepository employeeRepository,
                               DTOUtil dtoUtil,
                               WorkScheduleViewRepository workScheduleViewRepository,
                               MainCompositionRepository mainCompositionRepository,
                               SubstitutionCompositionRepository substitutionCompositionRepository) {
        super(scheduleRepository);
        this.dtoUtil = dtoUtil;
        this.scheduleRepository = scheduleRepository;
        this.employeeRepository = employeeRepository;
        this.workScheduleViewRepository = workScheduleViewRepository;
        this.mainCompositionRepository = mainCompositionRepository;
        this.substitutionCompositionRepository = substitutionCompositionRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeScheduleDTO> findAllDTOByDepartmentIdAndDate(Long departmentId,
                                                                     LocalDate from,
                                                                     LocalDate to) {
        var employees = employeeRepository.findAllByDepartmentIdOrderById(departmentId);
        var mainShiftCompositions = mainCompositionRepository.getAllByDepartmentIdAndDateBetweenOrdered(departmentId, from, to);
        var substitutionShiftCompositions = substitutionCompositionRepository.getAllByDepartmentIdAndDateBetweenOrdered(departmentId, from, to);
        var schedule = scheduleRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);

        return dtoUtil.createEmployeeScheduleDTOList(employees, mainShiftCompositions, substitutionShiftCompositions, schedule);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeScheduleDTO> findScheduleDTOByShiftIdsAndDate(List<Long> shiftIds,
                                                                      LocalDate from,
                                                                      LocalDate to) {
        var mainCompositions = mainCompositionRepository
                .getAllByShiftIdsAndDateBetweenOrdered(shiftIds, from, to);
        var mainCompositionIds = mainCompositions.stream().map(MainComposition::getId).collect(toList());

        var subCompositions = getSubstitutionCompositions(shiftIds, mainCompositionIds, from, to);

        if (mainCompositions.isEmpty() && subCompositions.isEmpty()) {
            return Collections.emptyList();
        }

        var employeeIds = CollectionUtils.collectDistinct(HasEmployeeId::getEmployeeId, mainCompositions, subCompositions);

        var employees = employeeRepository.findAllById(employeeIds);
        employees.sort(Comparator.comparing(Employee::getId));

        var departmentId = employees.get(0).getDepartmentId();

        var schedule = scheduleRepository.findAllByEmployeeIdsAndDateBetween(departmentId, employeeIds, from, to);

        return dtoUtil.createEmployeeScheduleDTOList(employees, mainCompositions, subCompositions, schedule);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeScheduleDTO> findScheduleDTOByViewIdAndDate(Long viewId, LocalDate from, LocalDate to) {
        var view = workScheduleViewRepository.findById(viewId).orElseThrow();

        var dayTypeIds = view.getViewDayTypes()
                .stream()
                .map(WorkScheduleViewDayType::getDayTypeId)
                .collect(toList());

        var workDays = scheduleRepository.findAllByDepartmentIdAndDayTypeIdInAndDateBetween(view.getTargetDepartmentId(), dayTypeIds, from, to);

        var employeeIds = CollectionUtils.collectSortedDistinct(HasEmployeeId::getEmployeeId, workDays);

        var employees = employeeRepository.findAllById(employeeIds);
        employees.sort(Comparator.comparing(Employee::getId));

        return dtoUtil.createEmployeeScheduleDTOList(employees, workDays);
    }

    private List<SubstitutionComposition> getSubstitutionCompositions(List<Long> shiftIds,
                                                                      List<Long> mainCompositionIds,
                                                                      LocalDate from,
                                                                      LocalDate to) {
        if (mainCompositionIds == null || mainCompositionIds.isEmpty()) {
            return substitutionCompositionRepository.findAllByShiftIdsAndDatesBetween(shiftIds, from, to);
        } else {
            return substitutionCompositionRepository
                    .getAllByShiftIdsAndMainShiftCompositionInAndDateBetweenOrdered(shiftIds, mainCompositionIds, from, to);
        }
    }
}
