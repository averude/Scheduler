package service;

import entity.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ShiftRepository;

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
    public Iterable<Shift> findAllByDepartmentId(long departmentId) {
        return shiftRepository.findAllByDepartmentId(departmentId);
    }
}
