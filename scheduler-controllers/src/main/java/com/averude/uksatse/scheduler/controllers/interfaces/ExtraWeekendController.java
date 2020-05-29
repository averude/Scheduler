package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.security.annotations.IsAnyAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/extra_weekends")
public interface ExtraWeekendController
        extends ICrudController<ExtraWeekend>, IByAuthAndDateController<ExtraWeekend> {

    @IsAnyAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/dates")
    List<ExtraWeekend> getAllByAuth(Authentication authentication,
                                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                    @RequestParam(value = "from")
                                            LocalDate from,
                                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                    @RequestParam(value = "to")
                                            LocalDate to);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.POST, value = "/extra_work_day/{date}")
    ExtraWorkDay transfer(@PathVariable
                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                  LocalDate date,
                          @RequestBody ExtraWeekend entity);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<ExtraWeekend> get(@PathVariable Long id);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody ExtraWeekend entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody ExtraWeekend entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
