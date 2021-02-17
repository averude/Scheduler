package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.structure.Enterprise;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/enterprises")
public interface EnterpriseController extends ICrudController<Enterprise>, IByAuthController<Enterprise> {

    @PreAuthorize("@userPermissionChecker.isGlobalAdmin(authentication)")
    @GetMapping
    List<Enterprise> getAll();

    @IsEnterpriseAdmin
    @GetMapping("/current")
    Optional<Enterprise> getCurrent(Authentication authentication);

    @IsGlobalAdmin
    @GetMapping("/{id}")
    Optional<Enterprise> get(@PathVariable Long id);

    @IsGlobalAdmin
    @PostMapping
    ResponseEntity<Long> post(@Valid @RequestBody Enterprise entity, Authentication authentication);

    @IsGlobalAdmin
    @PutMapping
    ResponseEntity<?> put(@Valid @RequestBody Enterprise entity, Authentication authentication);

    @IsGlobalAdmin
    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
