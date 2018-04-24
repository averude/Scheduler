package service;

import dao.EmployeeDAO;
import dao.PositionDAO;
import entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class EmployeeServiceImpl
        extends AbstractService<Employee> implements EmployeeService {

    private final EmployeeDAO employeeDAO;
    private final PositionDAO positionDAO;

    @Autowired
    public EmployeeServiceImpl(EmployeeDAO employeeDAO, PositionDAO positionDAO) {
        super(employeeDAO);
        this.employeeDAO = employeeDAO;
        this.positionDAO = positionDAO;
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Employee employee) {
        positionDAO.findById(parentId).addEmployee(employee);
    }

    @Override
    @Transactional
    public Collection<Employee> getAll(long parentId) {
        return positionDAO.findById(parentId).getEmployees();
    }

    @Override
    @Transactional
    public void updateById(long id, Employee employee) {
        employee.setId(id);
        employeeDAO.update(employee);
    }
}
