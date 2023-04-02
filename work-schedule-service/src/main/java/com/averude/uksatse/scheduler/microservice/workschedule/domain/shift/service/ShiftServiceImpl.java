package com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.entity.Shift;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShiftServiceImpl
        extends AService<Shift, Long> implements ShiftService {

    private final ShiftRepository shiftRepository;

    @Autowired
    public ShiftServiceImpl(ShiftRepository shiftRepository) {
        super(shiftRepository);
        this.shiftRepository = shiftRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Shift> findAllByDepartmentId(Long departmentId) {
        return shiftRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Shift> findAllByShiftIds(List<Long> shiftIds) {
        return shiftRepository.findAllById(shiftIds);
    }
}
