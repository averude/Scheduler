package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ExtraWorkDayRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdAndDateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExtraWorkDayServiceImpl
        extends AByEnterpriseIdAndDateService<ExtraWorkDay, Long> implements ExtraWorkDayService {

    private final ExtraWorkDayRepository    extraWorkDayRepository;
    private final DepartmentRepository      departmentRepository;
    private final ShiftRepository           shiftRepository;

    @Autowired
    public ExtraWorkDayServiceImpl(ExtraWorkDayRepository extraWorkDayRepository,
                                   DepartmentRepository departmentRepository,
                                   ShiftRepository shiftRepository) {
        super(extraWorkDayRepository, departmentRepository, shiftRepository);
        this.extraWorkDayRepository = extraWorkDayRepository;
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
    }
}
