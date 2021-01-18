package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/summation_columns")
public interface SummationColumnController
        extends ICrudController<SummationColumn> {

    @IsAnyUser
    @RequestMapping(method = RequestMethod.GET, value = "/dto")
    List<? extends BasicDto<SummationColumn, SummationColumnDayTypeRange>> getAllDtoByAuth(Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.POST, value = "/dto")
    BasicDto<SummationColumn, SummationColumnDayTypeRange> postDto(@RequestBody BasicDto<SummationColumn, SummationColumnDayTypeRange> dto, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.PUT, value = "/dto")
    BasicDto<SummationColumn, SummationColumnDayTypeRange> putDto(@RequestBody BasicDto<SummationColumn, SummationColumnDayTypeRange> dto, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{id}")
    Optional<SummationColumn> get(@PathVariable Long id);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody SummationColumn entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody SummationColumn entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
