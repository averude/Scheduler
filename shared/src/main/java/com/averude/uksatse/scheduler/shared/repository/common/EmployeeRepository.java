package com.averude.uksatse.scheduler.shared.repository.common;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

public interface EmployeeRepository extends IByDepartmentIdRepository<Employee, Long> {

    @Override
    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findAllByDepartmentId(Long departmentId);

    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findAllByDepartmentIdOrderById(Long departmentId);
}
