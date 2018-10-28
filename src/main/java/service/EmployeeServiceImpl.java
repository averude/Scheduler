package service;

import dao.EmployeeDAO;
import entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class EmployeeServiceImpl
        extends AbstractService<Employee> implements EmployeeService {

    private final EmployeeDAO employeeDAO;

    @Autowired
    public EmployeeServiceImpl(EmployeeDAO employeeDAO) {
        super(employeeDAO);
        this.employeeDAO = employeeDAO;
    }

    @Override
    @Transactional
    public Collection<Employee> findAllInDepartment(long departmentId) {
        return this.employeeDAO.getAllInDepartment(departmentId);
    }

    @Override
    @Transactional
    public Collection<Employee> findAllInParent(long parentId) {
        return employeeDAO.getAllInPosition(parentId);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Employee employee) {
        if (parentId != employee.getPositionId()){
            throw new IllegalArgumentException("URI id of position doesn't " +
                    "match with position id in Employee entity");
        }
        employeeDAO.create(employee);
    }

    @Override
    @Transactional
    public void updateById(long id, Employee employee) {
        employee.setId(id);
        employeeDAO.update(employee);
    }
}
