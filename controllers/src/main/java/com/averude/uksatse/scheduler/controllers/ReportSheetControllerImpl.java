package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.interfaces.ReportSheetController;
import com.averude.uksatse.scheduler.core.model.dto.ReportSheetDTO;
import com.averude.uksatse.scheduler.core.model.entity.ReportSheet;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.shared.service.ReportSheetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.averude.uksatse.scheduler.security.authority.Authorities.DEPARTMENT_ADMIN;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ReportSheetControllerImpl implements ReportSheetController {

    private final ReportSheetService reportSheetService;
    private final DepartmentIdEntityModifier<ReportSheet> entityModifier;

    @Override
    public List<ReportSheetDTO> getAllByAuth(Authentication authentication) {
        UserAccount account = (UserAccount) authentication.getPrincipal();
        log.debug("User:{} - Getting all DTOs.", authentication.getPrincipal());

        if (account.getAuthority().equals(DEPARTMENT_ADMIN)) {
            return reportSheetService.findAllByDepartmentId(account.getDepartmentId());
        } else throw new AccessDeniedException("User don't have required permission");
    }

    @Override
    public ReportSheetDTO postDTO(ReportSheetDTO dto, Authentication authentication) {
        entityModifier.modify(dto.getReportSheet(), authentication);
        log.debug("User:{} - Posting DTO:{}.", authentication.getPrincipal(), dto);
        return reportSheetService.save(dto);
    }

    @Override
    public ReportSheetDTO putDTO(ReportSheetDTO dto, Authentication authentication) {
        entityModifier.modify(dto.getReportSheet(), authentication);
        log.debug("User:{} - Putting DTO:{}.", authentication.getPrincipal(), dto);
        return reportSheetService.save(dto);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return reportSheetService.findById(id).map(entity -> {
            reportSheetService.delete(entity);
            log.debug("User:{} - Removed entity:{}.", authentication.getPrincipal(), entity);
            return new ResponseEntity<>("Entity with ID:" + id +
                    " was successfully deleted", HttpStatus.NO_CONTENT);
        }).orElseThrow();
    }
}
