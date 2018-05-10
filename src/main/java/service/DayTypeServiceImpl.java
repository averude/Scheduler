package service;

import dao.DayTypeDAO;
import entity.DayType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType> implements DayTypeService {

    private final DayTypeDAO dayTypeDAO;

    @Autowired
    public DayTypeServiceImpl(DayTypeDAO dayTypeDAO) {
        super(dayTypeDAO);
        this.dayTypeDAO = dayTypeDAO;
    }

    @Override
    public Collection<DayType> findAllInParent(long parentId) {
        throw new UnsupportedOperationException(); // should be rewritten later
    }

    @Override
    public void createInParent(long parentId, DayType dayType) {
        throw new UnsupportedOperationException(); // should be rewritten later
    }

    @Override
    @Transactional
    public void updateById(long id, DayType dayType) {
        dayType.setId(id);
        dayTypeDAO.update(dayType);
    }
}
