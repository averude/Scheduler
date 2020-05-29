package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.SummationColumnDayTypeRangeRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SummationColumnDayTypeRangeServiceImpl
        extends AByEnterpriseIdService<SummationColumnDayTypeRange, Long> implements SummationColumnDayTypeRangeService {

    private final SummationColumnDayTypeRangeRepository summationColumnDayTypeRangeRepository;
    private final DepartmentRepository                  departmentRepository;
    private final ShiftRepository                       shiftRepository;

    @Autowired
    public SummationColumnDayTypeRangeServiceImpl(SummationColumnDayTypeRangeRepository summationColumnDayTypeRangeRepository,
                                                  DepartmentRepository departmentRepository,
                                                  ShiftRepository shiftRepository) {
        super(summationColumnDayTypeRangeRepository, departmentRepository, shiftRepository);
        this.summationColumnDayTypeRangeRepository = summationColumnDayTypeRangeRepository;
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
    }
}
