package com.averude.uksatse.scheduler.microservice.workschedule.domain.composition.service;

import com.averude.uksatse.scheduler.core.model.entity.MainComposition;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.MainCompositionRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class MainCompositionServiceImpl
        extends AService<MainComposition, Long> implements MainCompositionService {

    private final MainCompositionRepository mainCompositionRepository;

    @Autowired
    public MainCompositionServiceImpl(MainCompositionRepository mainCompositionRepository) {
        super(mainCompositionRepository);
        this.mainCompositionRepository = mainCompositionRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MainComposition> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return mainCompositionRepository.findAllByDepartmentIdAndDatesBetween(departmentId, from, to);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MainComposition> findAllByShiftIdsAndDateBetween(List<Long> shiftIds, LocalDate from, LocalDate to) {
        return mainCompositionRepository.findAllByShiftIdInAndToGreaterThanEqualAndFromLessThanEqualOrderByEmployeeId(shiftIds, from, to);
    }
}
