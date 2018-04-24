package dao;

import entity.Employee;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EmployeeDAOImpl
        extends AbstractDAO<Employee> implements EmployeeDAO {

    @Autowired
    public EmployeeDAOImpl(SessionFactory sessionFactory) {
        super(Employee.class);
        this.setSessionFactory(sessionFactory);
    }
}
