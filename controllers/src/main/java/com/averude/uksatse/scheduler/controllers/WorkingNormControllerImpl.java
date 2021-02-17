package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.WorkingNormController;
import com.averude.uksatse.scheduler.controllers.logging.Logged;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.dto.GenerationDTO;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.WorkingNormService;
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
public class WorkingNormControllerImpl
        extends AByAuthController<WorkingNorm> implements WorkingNormController {

    private final WorkingNormService workingNormService;

    @Autowired
    public WorkingNormControllerImpl(WorkingNormService workingNormService,
                                     SimpleByAuthMethodResolver authStrategy,
                                     DepartmentIdEntityModifier<WorkingNorm> entityModifier) {
        super(workingNormService, authStrategy, entityModifier, LoggerFactory.getLogger(WorkingNormController.class));
        this.workingNormService = workingNormService;
    }

    @Override
    public List<? extends BasicDto<Shift, WorkingNorm>> getAllDtoByAuth(Authentication authentication,
                                                                        @NonNull LocalDate from,
                                                                        @NonNull LocalDate to) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        if (userAccount.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)) {
            Long departmentId = userAccount.getDepartmentId();
            return workingNormService.findAllDtoByDepartmentIdAndDate(departmentId, from, to);
        } else throw new AccessDeniedException("User doesn't have required permission");
    }

    @Override
    public List<WorkingNorm> getAllByAuth(Authentication authentication,
                                          @NonNull LocalDate from,
                                          @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Logged
    @Override
    public List<? extends BasicDto<Shift, WorkingNorm>> getAllDtoByDepartmentId(Long departmentId,
                                                                                LocalDate from,
                                                                                LocalDate to) {
        return workingNormService.findAllDtoByDepartmentIdAndDate(departmentId, from, to);
    }

    @Logged
    @Override
    public List<WorkingNorm> getAllByDepartmentId(Long departmentId,
                                                  LocalDate from,
                                                  LocalDate to) {
        return workingNormService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Logged
    @Override
    public List<WorkingNorm> getAllByShiftIds(List<Long> shiftIds,
                                              LocalDate from,
                                              LocalDate to) {
        return workingNormService.findAllByShiftIdsAndDateBetween(shiftIds, from, to);
    }

    @Override
    public Optional<WorkingNorm> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }

    @Override
    public void generateWorkingHoursNorm(Authentication authentication,
                                         GenerationDTO generationDTO) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        if (userAccount.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)) {
            Long departmentId = userAccount.getDepartmentId();
            workingNormService.generateWorkingNorm(departmentId,
                    generationDTO.getShiftId(),
                    generationDTO.getFrom(),
                    generationDTO.getTo(),
                    generationDTO.getOffset());
        } else throw new AccessDeniedException("User doesn't have required permission");
    }
}
