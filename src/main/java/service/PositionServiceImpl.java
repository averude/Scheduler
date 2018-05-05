package service;

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

    @Autowired
    public PositionServiceImpl(PositionDAO positionDAO) {
        super(positionDAO);
        this.positionDAO = positionDAO;
    }

    @Override
    @Transactional
    public Collection<Position> findAllInParent(long parentId) {
        return positionDAO.getAllDepartment(parentId);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Position position) {
        if (position.getDepartmentId() != parentId){
            throw new IllegalArgumentException("URI id of department doesn't " +
                    "match with department id in Position entity");
        }
        positionDAO.create(position);
    }

    @Override
    @Transactional
    public void updateById(long positionId, Position position) {
        position.setId(positionId);
        positionDAO.update(position);
    }
}
