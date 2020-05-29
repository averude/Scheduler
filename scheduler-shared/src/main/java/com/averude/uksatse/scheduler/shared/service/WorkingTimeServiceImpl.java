package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.WorkingTimeRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByDepartmentIdAndDateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkingTimeServiceImpl
        extends AByDepartmentIdAndDateService<WorkingTime, Long> implements WorkingTimeService {

    private final WorkingTimeRepository workingTimeRepository;
    private final ShiftRepository       shiftRepository;

    @Autowired
    public WorkingTimeServiceImpl(WorkingTimeRepository workingTimeRepository,
                                  ShiftRepository shiftRepository) {
        super(workingTimeRepository, shiftRepository);
        this.workingTimeRepository = workingTimeRepository;
        this.shiftRepository = shiftRepository;
    }
}
