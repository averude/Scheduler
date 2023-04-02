package com.averude.uksatse.scheduler.microservice.workschedule.domain.position.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.position.entity.Position;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.position.service.PositionService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/positions")
@RestController
@RequiredArgsConstructor
public class PositionController {

    private final PositionService positionService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<Position> findAllByDepartmentId(@PathVariable Long departmentId) {
        return positionService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PostAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #returnObject)")
    @GetMapping("/{id}")
    public Optional<Position> getById(@PathVariable Long id) {
        return positionService.findById(id);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #position)")
    @PostMapping
    public Position post(@RequestBody @Valid Position position) {
        return positionService.save(position);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #position)")
    @PutMapping
    public Position put(@RequestBody @Valid Position position) {
        return positionService.save(position);
    }

    @Logged
    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        positionService.findById(id).ifPresent(positionService::delete);
    }
}
