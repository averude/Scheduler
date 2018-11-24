package dao;

import entity.Employee;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public class EmployeeDAOImpl
        extends AbstractDAO<Employee> implements EmployeeDAO {

    @Autowired
    public EmployeeDAOImpl(SessionFactory sessionFactory) {
        super(Employee.class);
        this.setSessionFactory(sessionFactory);
    }

    @Override
    public Collection<Employee> getAllInPosition(long positionId) {
        return getCurrentSession()
                .createQuery("from Employee e " +
                        "where e.positionId = :positionId", Employee.class)
                .setParameter("positionId", positionId)
                .getResultList();
    }

    @Override
    public Collection<Employee> getAllInDepartment(long departmentId) {
        return getCurrentSession()
                .createQuery("select e " +
                        "from Position p " +
                        "inner join " +
                        "Employee e " +
                        "on e.positionId = p.id " +
                        "where p.departmentId = :departmentId", Employee.class)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }
}
