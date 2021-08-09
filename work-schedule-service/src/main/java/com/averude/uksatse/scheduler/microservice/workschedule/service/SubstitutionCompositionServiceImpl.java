package com.averude.uksatse.scheduler.microservice.workschedule.service;

import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.shared.repository.SubstitutionCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.AService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SubstitutionCompositionServiceImpl
        extends AService<SubstitutionComposition, Long>
        implements SubstitutionCompositionService {

    private final SubstitutionCompositionRepository substitutionCompositionRepository;

    @Autowired
    public SubstitutionCompositionServiceImpl(SubstitutionCompositionRepository substitutionCompositionRepository) {
        super(substitutionCompositionRepository);
        this.substitutionCompositionRepository = substitutionCompositionRepository;
    }
}
