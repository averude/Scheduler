package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/patterns")
public interface ShiftPatternController extends BasicCrudController<ShiftPattern> {

    @RequestMapping(method = RequestMethod.GET,
                    value = "/dto/departments/{departmentId}")
    List<BasicDto<ShiftPattern, PatternUnit>> getAllDtoByDepartmentId(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/dto/shifts/{shiftId}")
    List<BasicDto<ShiftPattern, PatternUnit>> getAllDtoByShiftId(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/dto")
    BasicDto<ShiftPattern, PatternUnit> postDto(@RequestBody BasicDto<ShiftPattern, PatternUnit> dto);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/dto")
    BasicDto<ShiftPattern, PatternUnit> putDto(@RequestBody BasicDto<ShiftPattern, PatternUnit> dto);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/departments/{departmentId}")
    List<ShiftPattern> getAllByDepartmentId(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/shifts/{shiftId}")
    List<ShiftPattern> getAllByShiftId(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<ShiftPattern> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody ShiftPattern entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody ShiftPattern entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
