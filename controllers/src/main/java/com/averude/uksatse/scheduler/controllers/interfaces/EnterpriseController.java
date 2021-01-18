package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/enterprises")
public interface EnterpriseController extends ICrudController<Enterprise>, IByAuthController<Enterprise> {
    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.GET)
    List<Enterprise> getAllByAuth(Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/current")
    Optional<Enterprise> getCurrent(Authentication authentication);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Enterprise> get(@PathVariable Long id);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody Enterprise entity, Authentication authentication);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody Enterprise entity, Authentication authentication);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
