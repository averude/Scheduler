package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.dto.CountDTO;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftUser;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/statistics")
public interface StatisticsController {
    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/positions/employees")
    Iterable<CountDTO> getNumberOfEmployeesInPositionsByDepartmentId(Authentication authentication) throws Exception;

    @IsDepartmentOrShiftUser
    @RequestMapping(method = RequestMethod.GET,
            value = "/summation_columns/{mode}/dates")
    List<EmployeeWorkStatDTO> getSummationDTOByAuthAndDate(Authentication authentication,
                                                           @PathVariable String mode,
                                                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                 @RequestParam(value = "from")
                                                                         LocalDate from,
                                                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                 @RequestParam(value = "to")
                                                                         LocalDate to);
}
