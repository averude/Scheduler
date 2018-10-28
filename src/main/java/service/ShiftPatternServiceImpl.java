package service;

import dao.DepartmentDAO;
import dao.ShiftPatternDAO;
import entity.ShiftPattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class ShiftPatternServiceImpl
        extends AbstractService<ShiftPattern> implements ShiftPatternService {

    private final ShiftPatternDAO shiftPatternDAO;
    private final DepartmentDAO departmentDAO;

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternDAO shiftPatternDAO,
                                   DepartmentDAO departmentDAO) {
        super(shiftPatternDAO);
        this.shiftPatternDAO = shiftPatternDAO;
        this.departmentDAO = departmentDAO;
    }

    @Override
    @Transactional
    public Collection<ShiftPattern> findAllInParent(long parentId) {
        return this.departmentDAO.findById(parentId).getPatterns();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, ShiftPattern pattern) {
        this.departmentDAO.findById(parentId).addPattern(pattern);
    }

    @Override
    @Transactional
    public void updateById(long id, ShiftPattern pattern) {
        pattern.setId(id);
        shiftPatternDAO.update(pattern);
    }
}
