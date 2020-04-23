package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.EnterpriseController;
import com.averude.uksatse.scheduler.core.entity.Enterprise;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.EnterpriseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class EnterpriseControllerImpl
        extends AbstractCrudController<Enterprise> implements EnterpriseController {

    private final EnterpriseService enterpriseService;

    @Autowired
    public EnterpriseControllerImpl(EnterpriseService enterpriseService) {
        super(enterpriseService, LoggerFactory.getLogger(EnterpriseController.class));
        this.enterpriseService = enterpriseService;
    }

    @Override
    public Iterable<Enterprise> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<Enterprise> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
