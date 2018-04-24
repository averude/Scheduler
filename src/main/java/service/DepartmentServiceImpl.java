package service;

import dao.DepartmentDAO;
import entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department> implements DepartmentService {

    private final DepartmentDAO departmentDAO;

    @Autowired
    DepartmentServiceImpl(DepartmentDAO departmentDAO){
        super(departmentDAO);
        this.departmentDAO = departmentDAO;
    }

    @Override
    @Transactional
    public Collection<Department> getAll(long parentId) {
        throw new UnsupportedOperationException();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Department department) {
        throw new UnsupportedOperationException();
    }

    @Override
    @Transactional
    public void updateById(long id, Department department) {
        department.setId(id);
        departmentDAO.update(department);
    }
}
