package service;

import entity.ShiftPattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ShiftPatternRepository;

@Service
public class ShiftPatternServiceImpl
        extends AbstractService<ShiftPattern, Long> implements ShiftPatternService {

    private final ShiftPatternRepository shiftPatternRepository;

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternRepository shiftPatternRepository) {
        super(shiftPatternRepository);
        this.shiftPatternRepository = shiftPatternRepository;
    }

    @Override
    @Transactional
    public Iterable<ShiftPattern> findAllByDepartmentId(long departmentId) {
        return shiftPatternRepository.findAllByDepartmentId(departmentId);
    }
}
