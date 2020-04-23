package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ShiftPatternController;
import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.ShiftPatternService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ShiftPatternControllerImpl
        extends AbstractCrudController<ShiftPattern> implements ShiftPatternController {

    private final ShiftPatternService shiftPatternService;

    @Autowired
    ShiftPatternControllerImpl(ShiftPatternService shiftPatternService) {
        super(shiftPatternService, LoggerFactory.getLogger(ShiftPatternController.class));
        this.shiftPatternService = shiftPatternService;
    }

    @Override
    public List<BasicDto<ShiftPattern, PatternUnit>> getAllDtoByDepartmentId(Long departmentId) {
        return shiftPatternService.findAllDtoByDepartmentId(departmentId);
    }

    @Override
    public List<BasicDto<ShiftPattern, PatternUnit>> getAllDtoByShiftId(Long shiftId) {
        return shiftPatternService.findAllDtoByShiftId(shiftId);
    }

    @Override
    public BasicDto<ShiftPattern, PatternUnit> postDto(BasicDto<ShiftPattern, PatternUnit> dto) {
        return shiftPatternService.saveDto(dto);
    }

    @Override
    public BasicDto<ShiftPattern, PatternUnit> putDto(BasicDto<ShiftPattern, PatternUnit> dto) {
        return shiftPatternService.saveDto(dto);
    }

    @Override
    public List<ShiftPattern> getAllByDepartmentId(Long departmentId) {
        return this.shiftPatternService.findAllByDepartmentId(departmentId);
    }

    @Override
    public List<ShiftPattern> getAllByShiftId(Long shiftId) {
        return this.shiftPatternService.findAllByShiftId(shiftId);
    }

    @Override
    public Iterable<ShiftPattern> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<ShiftPattern> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
