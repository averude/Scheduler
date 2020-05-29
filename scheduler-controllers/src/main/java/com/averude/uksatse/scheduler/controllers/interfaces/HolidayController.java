package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.security.annotations.IsAnyAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/holidays")
public interface HolidayController extends ICrudController<Holiday>, IByAuthAndDateController<Holiday> {

    @IsAnyAdmin
    @RequestMapping(method = RequestMethod.GET,
            value = "/dates")
    List<Holiday> getAllByAuth(Authentication authentication,
                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                               @RequestParam(value = "from")
                                            LocalDate from,
                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                               @RequestParam(value = "to")
                                            LocalDate to);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Holiday> get(@PathVariable Long id);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody Holiday entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody Holiday entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
