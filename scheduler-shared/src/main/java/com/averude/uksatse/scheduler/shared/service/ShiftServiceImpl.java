package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
public class ShiftServiceImpl
        extends AbstractService<Shift, Long> implements ShiftService {

    private final ShiftRepository shiftRepository;

    @Autowired
    public ShiftServiceImpl(ShiftRepository shiftRepository) {
        super(shiftRepository);
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional
    public List<Shift> findAllByDepartmentId(Long departmentId) {
        return shiftRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Shift> findAllByShiftId(Long shiftId) {
        return Collections.singletonList(shiftRepository.findById(shiftId)
                .orElse(null));
    }
}
