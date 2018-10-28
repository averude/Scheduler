package service;

import dao.DayTypeDAO;
import dao.ShiftPatternDAO;
import entity.DayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType> implements DayTypeService {

    private final DayTypeDAO dayTypeDAO;
    private final ShiftPatternDAO shiftPatternDAO;

    @Autowired
    public DayTypeServiceImpl(DayTypeDAO dayTypeDAO,
                              ShiftPatternDAO shiftPatternDAO) {
        super(dayTypeDAO);
        this.dayTypeDAO = dayTypeDAO;
        this.shiftPatternDAO = shiftPatternDAO;
    }

    @Override
    @Transactional
    public Collection<DayType> findAllInParent(long parentId) {
        return this.shiftPatternDAO.findById(parentId).getDayTypes();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, DayType dayType) {
        this.shiftPatternDAO.findById(parentId).addDayType(dayType);
    }

    @Override
    @Transactional
    public void updateById(long id, DayType dayType) {
        dayType.setId(id);
        dayTypeDAO.update(dayType);
    }
}
