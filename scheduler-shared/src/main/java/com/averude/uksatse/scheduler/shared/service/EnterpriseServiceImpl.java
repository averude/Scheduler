package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Enterprise;
import com.averude.uksatse.scheduler.shared.repository.EnterpriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnterpriseServiceImpl
        extends AbstractService<Enterprise, Long> implements EnterpriseService {

    private final EnterpriseRepository enterpriseRepository;

    @Autowired
    public EnterpriseServiceImpl(EnterpriseRepository enterpriseRepository) {
        super(enterpriseRepository);
        this.enterpriseRepository = enterpriseRepository;
    }
}
