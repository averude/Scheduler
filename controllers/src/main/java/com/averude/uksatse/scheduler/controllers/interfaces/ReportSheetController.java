package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.dto.ReportSheetDTO;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RequestMapping("/admin/report_sheets")
public interface ReportSheetController {

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET)
    List<ReportSheetDTO> getAllByAuth(Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ReportSheetDTO postDTO(@RequestBody ReportSheetDTO dto, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ReportSheetDTO putDTO(@RequestBody ReportSheetDTO dto, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
