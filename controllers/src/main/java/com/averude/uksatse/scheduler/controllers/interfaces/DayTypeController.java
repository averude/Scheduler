package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/day_types")
public interface DayTypeController {

    @IsAnyUser
    @GetMapping
    List<DayType> getAllByAuth(Authentication authentication);

    @PreAuthorize("@userPermissionChecker.checkAnyUserOfEnterprise(authentication, #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    List<DayType> getAllByEnterpriseId(@PathVariable Long enterpriseId);

    @IsEnterpriseAdmin
    @GetMapping("/{id}")
    Optional<DayType> get(@PathVariable Long id);

    @IsEnterpriseAdmin
    @PostMapping
    ResponseEntity<Long> post(@RequestBody DayType entity, Authentication authentication);

    @IsEnterpriseAdmin
    @PutMapping
    ResponseEntity<?> put(@RequestBody DayType entity, Authentication authentication);

    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
