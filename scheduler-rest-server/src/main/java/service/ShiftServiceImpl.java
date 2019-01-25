package service;

import dao.ShiftDAO;
import entity.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Collection<Shift> findAllInParent(long parentId) {
        return shiftDAO.findAllInDepartment(parentId);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Shift shift) {
        if (shift.getDepartmentId() != parentId){
            throw new IllegalArgumentException("URI id of department doesn't " +
                    "match with department id in Shift entity");
        }
        shiftDAO.create(shift);
    }

    @Override
    @Transactional
    public void updateById(long id, Shift shift) {
        shift.setId(id);
        shiftDAO.update(shift);
    }
}
