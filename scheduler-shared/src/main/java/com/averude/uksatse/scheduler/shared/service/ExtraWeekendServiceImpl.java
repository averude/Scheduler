package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExtraWeekendServiceImpl extends AbstractService<ExtraWeekend, Long>
        implements ExtraWeekendService {

    private final ExtraWeekendRepository extraWeekendRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public ExtraWeekendServiceImpl(ExtraWeekendRepository extraWeekendRepository,
                                   DataByAuthorityExtractor extractor) {
        super(extraWeekendRepository);
        this.extraWeekendRepository = extraWeekendRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByDepartmentId(Long departmentId) {
        return extraWeekendRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to) {
        return extraWeekendRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByAuth(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAll(),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId));
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByAuthAndDateBetween(Authentication authentication,
                                                          LocalDate from,
                                                          LocalDate to) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAllByDepartmentIdAndDateBetween(departmentId, from, to),
                (departmentId, shiftId) -> findAllByDepartmentIdAndDateBetween(departmentId, from, to));
    }
}
