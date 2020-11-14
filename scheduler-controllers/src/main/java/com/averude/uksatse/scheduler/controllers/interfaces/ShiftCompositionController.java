package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftUser;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/shift_compositions")
public interface ShiftCompositionController
        extends ICrudController<ShiftComposition>, IByAuthAndDateController<ShiftComposition> {

    @IsDepartmentOrShiftUser
    @RequestMapping(method = RequestMethod.GET, value = "/dates")
    List<ShiftComposition> getAllByAuth(Authentication authentication,
                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                        @RequestParam(value = "from")
                                                LocalDate from,
                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                        @RequestParam(value = "to")
                                                LocalDate to);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<ShiftComposition> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody ShiftComposition entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody ShiftComposition entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
