package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.annotations.IsAnyAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/shifts")
public interface ShiftController extends ICrudController<Shift>, IByAuthController<Shift> {

    @IsAnyAdmin
    @RequestMapping(method = RequestMethod.GET)
    List<Shift> getAllByAuth(Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Shift> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody Shift entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody Shift entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
