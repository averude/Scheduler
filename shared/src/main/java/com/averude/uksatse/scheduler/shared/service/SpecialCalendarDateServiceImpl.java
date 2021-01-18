package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdAndDateService;
import org.springframework.stereotype.Service;

@Service
public class SpecialCalendarDateServiceImpl
        extends AByEnterpriseIdAndDateService<SpecialCalendarDate, Long>
        implements SpecialCalendarDateService {

    private final SpecialCalendarDateRepository specialCalendarDateRepository;
    private final DepartmentRepository departmentRepository;
    private final ShiftRepository shiftRepository;

    public SpecialCalendarDateServiceImpl(SpecialCalendarDateRepository specialCalendarDateRepository,
                                          DepartmentRepository departmentRepository,
                                          ShiftRepository shiftRepository) {
        super(specialCalendarDateRepository, departmentRepository, shiftRepository);
        this.specialCalendarDateRepository = specialCalendarDateRepository;
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
    }
}
