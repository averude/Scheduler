package dao;

import entity.Shift;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class ShiftDAOImpl extends AbstractDAO<Shift> implements ShiftDAO {

    @Autowired
    public ShiftDAOImpl(SessionFactory sessionFactory) {
        super(Shift.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<Shift> findAllInDepartment(Long departmentId) {
        return getCurrentSession()
                .createQuery("from Shift s " +
                        "where s.departmentId = :departmentId", Shift.class)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }
}
