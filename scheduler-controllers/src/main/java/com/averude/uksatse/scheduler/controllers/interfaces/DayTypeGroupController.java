package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/day_type_groups")
public interface DayTypeGroupController extends ICrudController<DayTypeGroup> {

    @IsAnyUser
    @RequestMapping(method = RequestMethod.GET)
    Iterable<DayTypeGroup> getAll();

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<DayTypeGroup> get(@PathVariable Long id);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody DayTypeGroup entity, Authentication authentication);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody DayTypeGroup entity, Authentication authentication);

    @IsGlobalAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
