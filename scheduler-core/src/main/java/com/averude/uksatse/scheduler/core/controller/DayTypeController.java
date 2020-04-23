package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.DayType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/day_types")
public interface DayTypeController extends BasicCrudController<DayType> {

    @RequestMapping(method = RequestMethod.GET,
                    value = "/enterprises/{enterpriseId}")
    List<DayType> getAllByEnterpriseId(@PathVariable Long enterpriseId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/departments/{departmentId}")
    List<DayType> getAllByDepartmentId(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/shifts/{shiftId}")
    List<DayType> getAllByShiftId(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<DayType> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody DayType entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody DayType entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
