package service;

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

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternDAO shiftPatternDAO) {
        super(shiftPatternDAO);
        this.shiftPatternDAO = shiftPatternDAO;
    }

    @Override
    @Transactional
    public Collection<ShiftPattern> findAllInParent(long parentId) {
        return shiftPatternDAO.findAllInDepartment(parentId);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, ShiftPattern pattern) {
        if (pattern.getDepartmentId() != parentId){
            throw new IllegalArgumentException("URI id of department doesn't " +
                    "match with department id in ShiftPattern entity");
        }
        shiftPatternDAO.create(pattern);
    }

    @Override
    @Transactional
    public void updateById(long id, ShiftPattern pattern) {
        pattern.setId(id);
        shiftPatternDAO.update(pattern);
    }
}
