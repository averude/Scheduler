package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/summation_columns")
public interface SummationColumnController
        extends ICrudController<SummationColumn> {

    @IsAnyUser
    @GetMapping("/dto")
    List<? extends BasicDto<SummationColumn, SummationColumnDayTypeRange>> getAllDtoByAuth(Authentication authentication);

    @PreAuthorize("@userPermissionChecker.checkAnyUserOfEnterprise(authentication, #enterpriseId)")
    @GetMapping("/dto/enterprises/{enterpriseId}")
    List<? extends BasicDto<SummationColumn, SummationColumnDayTypeRange>> getAllDTOByDepartmentId(@PathVariable Long enterpriseId);

    @IsEnterpriseAdmin
    @PostMapping("/dto")
    BasicDto<SummationColumn, SummationColumnDayTypeRange> postDto(@RequestBody BasicDto<SummationColumn, SummationColumnDayTypeRange> dto, Authentication authentication);

    @IsEnterpriseAdmin
    @PutMapping("/dto")
    BasicDto<SummationColumn, SummationColumnDayTypeRange> putDto(@RequestBody BasicDto<SummationColumn, SummationColumnDayTypeRange> dto, Authentication authentication);

    @IsEnterpriseAdmin
    @GetMapping("/{id}")
    Optional<SummationColumn> get(@PathVariable Long id);

    @IsEnterpriseAdmin
    @PostMapping
    ResponseEntity<Long> post(@RequestBody SummationColumn entity, Authentication authentication);

    @IsEnterpriseAdmin
    @PutMapping
    ResponseEntity<?> put(@RequestBody SummationColumn entity, Authentication authentication);

    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
