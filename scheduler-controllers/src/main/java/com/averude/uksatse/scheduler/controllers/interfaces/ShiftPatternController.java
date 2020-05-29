package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/patterns")
public interface ShiftPatternController extends ICrudController<ShiftPattern> {

    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/dto")
    List<BasicDto<ShiftPattern, PatternUnit>> getAllDtoByAuth(Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST,
                    value = "/dto")
    BasicDto<ShiftPattern, PatternUnit> postDto(@RequestBody BasicDto<ShiftPattern, PatternUnit> dto, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/dto")
    BasicDto<ShiftPattern, PatternUnit> putDto(@RequestBody BasicDto<ShiftPattern, PatternUnit> dto, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET)
    List<ShiftPattern> getAll(Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<ShiftPattern> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody ShiftPattern entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody ShiftPattern entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
