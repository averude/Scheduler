package dao;

import entity.ShiftPattern;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class ShiftPatternDAOImpl
        extends AbstractDAO<ShiftPattern> implements ShiftPatternDAO {

    @Autowired
    public ShiftPatternDAOImpl(SessionFactory sessionFactory){
        super(ShiftPattern.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<ShiftPattern> findAllInDepartment(Long departmentId) {
        return getCurrentSession()
                .createQuery("from ShiftPattern sp " +
                        "where sp.departmentId = :departmentId", ShiftPattern.class)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }
}
