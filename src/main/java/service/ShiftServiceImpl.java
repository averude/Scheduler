package service;

import dao.ShiftDAO;
import entity.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ShiftServiceImpl
        extends AbstractService<Shift> implements ShiftService {

    private final ShiftDAO shiftDAO;

    @Autowired
    public ShiftServiceImpl(ShiftDAO shiftDAO) {
        super(shiftDAO);
        this.shiftDAO = shiftDAO;
    }

    @Override
    public Collection<Shift> getAll(long parentId) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void createInParent(long parentId, Shift shift) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void updateById(long id, Shift shift) {
        shift.setId(id);
        shiftDAO.update(shift);
    }
}
