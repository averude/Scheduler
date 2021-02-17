package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.SubstitutionShiftComposition;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftUser;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/substitution_shift_compositions")
public interface SubstitutionCompositionController
        extends ICrudController<SubstitutionShiftComposition>, IByAuthAndDateController<SubstitutionShiftComposition> {

    @IsDepartmentOrShiftUser
    @RequestMapping(method = RequestMethod.GET, value = "/dates")
    List<SubstitutionShiftComposition> getAllByAuth(Authentication authentication,
                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                            @RequestParam(value = "from")
                                                    LocalDate from,
                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                            @RequestParam(value = "to")
                                                    LocalDate to);

    @PreAuthorize("@userPermissionChecker.checkDepartmentUser(authentication, #departmentId)")
    @GetMapping("/departments/{departmentId}/dates")
    List<SubstitutionShiftComposition> getAllByDepartmentId(@PathVariable Long departmentId,
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                            @RequestParam(value = "from")
                                                                    LocalDate from,
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                            @RequestParam(value = "to")
                                                                    LocalDate to);

    @PreAuthorize("@userPermissionChecker.checkShiftUser(authentication, #shiftIds)")
    @GetMapping("/departments/{shiftIds}/dates")
    List<SubstitutionShiftComposition> getAllByShiftIds(@PathVariable List<Long> shiftIds,
                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                        @RequestParam(value = "from")
                                                                LocalDate from,
                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                        @RequestParam(value = "to")
                                                                LocalDate to);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<SubstitutionShiftComposition> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody SubstitutionShiftComposition entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody SubstitutionShiftComposition entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);

}
