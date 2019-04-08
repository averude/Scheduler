package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    Iterable<Employee> findAllByPositionId(long positionId);

    @Query("select e " +
            "from Position p " +
            "inner join " +
            "Employee e " +
            "on e.positionId = p.id " +
            "where p.departmentId = ?1")
    Iterable<Employee> findAllByDepartmentId(long departmentId);

    Iterable<Employee> findAllByShiftId(long shiftId);


}
