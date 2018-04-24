package dao;

import entity.Department;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class DepartmentDAOImpl
        extends AbstractDAO<Department> implements DepartmentDAO {

    @Autowired
    public DepartmentDAOImpl(SessionFactory sessionFactory) {
        super(Department.class);
        this.setSessionFactory(sessionFactory);
    }
}
