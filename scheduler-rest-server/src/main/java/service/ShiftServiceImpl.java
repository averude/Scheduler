package service;

import dao.DepartmentDAO;
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
    private final DepartmentDAO departmentDAO;

    @Autowired
    public ShiftServiceImpl(ShiftDAO shiftDAO,
                            DepartmentDAO departmentDAO) {
        super(shiftDAO);
        this.shiftDAO = shiftDAO;
        this.departmentDAO = departmentDAO;
    }

    @Override
    @Transactional
    public Collection<Shift> findAllInParent(long parentId) {
        return departmentDAO.findById(parentId).getShifts();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Shift shift) {
        departmentDAO.findById(parentId).addShift(shift);
    }

    @Override
    @Transactional
    public void updateById(long id, Shift shift) {
        shift.setId(id);
        shiftDAO.update(shift);
    }
}
