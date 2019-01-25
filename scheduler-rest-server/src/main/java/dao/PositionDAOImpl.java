package dao;

import entity.Position;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class PositionDAOImpl
        extends AbstractDAO<Position> implements PositionDAO{

    @Autowired
    public PositionDAOImpl(SessionFactory sessionFactory) {
        super(Position.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<Position> findAllInDepartment(long departmentId) {
        return getCurrentSession()
                .createQuery("from Position  p " +
                        "where p.departmentId = :departmentId", Position.class)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }
}
