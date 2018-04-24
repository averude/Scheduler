package service;

import dao.DepartmentDAO;
import dao.PositionDAO;
import entity.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class PositionServiceImpl
        extends AbstractService<Position> implements PositionService {

    private final PositionDAO positionDAO;
    private final DepartmentDAO departmentDAO;

    @Autowired
    public PositionServiceImpl(PositionDAO positionDAO, DepartmentDAO departmentDAO) {
        super(positionDAO);
        this.positionDAO = positionDAO;
        this.departmentDAO = departmentDAO;
    }

    @Override
    public Collection<Position> getAll(long parentId) {
        return departmentDAO.findById(parentId).getPositions();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Position position) {
        departmentDAO.findById(parentId).addPosition(position);
    }

    @Override
    @Transactional
    public void updateById(long positionId, Position position) {
        position.setId(positionId);
        positionDAO.update(position);
    }
}
