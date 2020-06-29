package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.WorkingTimeController;
import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.dto.GenerationDTO;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.WorkingTimeService;
import lombok.NonNull;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class WorkingTimeControllerImpl
        extends AByAuthController<WorkingTime> implements WorkingTimeController {

    private final WorkingTimeService workingTimeService;

    @Autowired
    public WorkingTimeControllerImpl(WorkingTimeService workingTimeService,
                                     SimpleByAuthMethodResolver authStrategy,
                                     DepartmentIdEntityModifier<WorkingTime> entityModifier) {
        super(workingTimeService, authStrategy, entityModifier, LoggerFactory.getLogger(WorkingTimeController.class));
        this.workingTimeService = workingTimeService;
    }

    @Override
    public List<BasicDto<Shift, WorkingTime>> getAllDtoByAuth(Authentication authentication,
                                                              @NonNull LocalDate from,
                                                              @NonNull LocalDate to) {
        var userAccount = authentication.getPrincipal();

        if (userAccount instanceof DepartmentAdminUserAccount) {
            Long departmentId = ((DepartmentAdminUserAccount) userAccount).getDepartmentId();
            return workingTimeService.findAllDtoByDepartmentIdAndDate(departmentId, from, to);
        } else throw new AccessDeniedException("User doesn't have required permission");
    }

    @Override
    public List<WorkingTime> getAllByAuth(Authentication authentication,
                                          @NonNull LocalDate from,
                                          @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<WorkingTime> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }

    @Override
    public void generateWorkingHoursNorm(Authentication authentication,
                                         GenerationDTO generationDTO) {
        var userAccount = authentication.getPrincipal();

        if (userAccount instanceof DepartmentAdminUserAccount) {
            Long departmentId = ((DepartmentAdminUserAccount) userAccount).getDepartmentId();
            workingTimeService.generateWorkingTimeNorm(departmentId,
                    generationDTO.getShiftId(),
                    generationDTO.getFrom(),
                    generationDTO.getTo(),
                    generationDTO.getOffset());
        } else throw new AccessDeniedException("User doesn't have required permission");
    }
}
