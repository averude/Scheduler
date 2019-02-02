package service;

import entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
    }
}
