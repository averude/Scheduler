package dao;

import entity.DayType;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DayTypeDAOImpl
        extends AbstractDAO<DayType> implements DayTypeDAO{

    @Autowired
    DayTypeDAOImpl(SessionFactory sessionFactory) {
        super(DayType.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public List<DayType> findByEmployeeId(long employeeId) {
        // Should be optimized
        Long departmentId = getCurrentSession()
                .createQuery("select p.departmentId " +
                        "from Position p " +
                        "inner join Employee e " +
                        "on p.id = e.positionId " +
                        "where e.id = :employeeId",
                        Long.class)
                .setParameter("employeeId", employeeId)
                .getSingleResult();
        return getCurrentSession()
                .createQuery("select dt " +
                        "from ShiftPattern sp " +
                        "inner join DayType dt " +
                        "on sp.id = dt.patternId " +
                        "where sp.departmentId = :departmentId",
                        DayType.class)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }
}