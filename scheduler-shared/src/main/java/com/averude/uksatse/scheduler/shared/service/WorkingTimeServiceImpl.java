package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.WorkingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class WorkingTimeServiceImpl extends AbstractService<WorkingTime, Long>
        implements WorkingTimeService {

    private final WorkingTimeRepository workingTimeRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public WorkingTimeServiceImpl(WorkingTimeRepository workingTimeRepository,
                                  DataByAuthorityExtractor extractor) {
        super(workingTimeRepository);
        this.workingTimeRepository = workingTimeRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByDepartmentId(Long departmentId) {
        return workingTimeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                 LocalDate from,
                                                                 LocalDate to) {
        return workingTimeRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByAuth(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId));
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByAuthAndDateBetween(Authentication authentication,
                                                         LocalDate from,
                                                         LocalDate to) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAllByDepartmentIdAndDateBetween(departmentId, from, to),
                (departmentId, shiftId) -> findAllByDepartmentIdAndDateBetween(departmentId, from, to));
    }
}
