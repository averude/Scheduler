package service;

import entity.DayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.DayTypeRepository;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType, Long> implements DayTypeService {

    private final DayTypeRepository dayTypeRepository;

    @Autowired
    public DayTypeServiceImpl(DayTypeRepository dayTypeRepository) {
        super(dayTypeRepository);
        this.dayTypeRepository = dayTypeRepository;
    }
}
