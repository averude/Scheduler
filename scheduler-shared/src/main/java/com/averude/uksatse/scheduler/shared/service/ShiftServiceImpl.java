package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByDepartmentIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class ShiftServiceImpl
        extends AByDepartmentIdService<Shift, Long> implements ShiftService {

    private final ShiftRepository shiftRepository;

    @Autowired
    public ShiftServiceImpl(ShiftRepository shiftRepository) {
        super(shiftRepository, shiftRepository);
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional
    public List<Shift> findAllByShiftId(Long shiftId) {
        return Collections.singletonList(shiftRepository.findById(shiftId)
                .orElse(null));
    }
}
