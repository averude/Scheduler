package dao;

import entity.Position;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PositionDAOImpl
        extends AbstractDAO<Position> implements PositionDAO{

    @Autowired
    public PositionDAOImpl(SessionFactory sessionFactory) {
        super(Position.class);
        this.setSessionFactory(sessionFactory);
    }
}
