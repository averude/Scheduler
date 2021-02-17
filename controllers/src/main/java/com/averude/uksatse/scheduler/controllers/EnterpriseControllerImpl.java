package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.EnterpriseController;
import com.averude.uksatse.scheduler.controllers.logging.Logged;
import com.averude.uksatse.scheduler.core.model.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.EnterpriseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class EnterpriseControllerImpl
        extends AByAuthController<Enterprise> implements EnterpriseController {

    private final EnterpriseService enterpriseService;

    @Autowired
    public EnterpriseControllerImpl(EnterpriseService enterpriseService,
                                    SimpleByAuthMethodResolver authStrategy) {
        super(enterpriseService, authStrategy, LoggerFactory.getLogger(EnterpriseController.class));
        this.enterpriseService = enterpriseService;
    }

    @Logged
    @Override
    public List<Enterprise> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<Enterprise> get(Long id) {
        return super.get(id);
    }

    @Override
    public Optional<Enterprise> getCurrent(Authentication authentication) {
        var enterpriseId = ((UserAccount) authentication.getPrincipal()).getEnterpriseId();
        if (enterpriseId == null) throw new RuntimeException();

        return enterpriseService.findById(enterpriseId);
    }

    @Override
    public ResponseEntity<Long> post(Enterprise entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(Enterprise entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
