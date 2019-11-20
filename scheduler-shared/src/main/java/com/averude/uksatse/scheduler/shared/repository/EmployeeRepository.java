package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findAllByPositionIdOrderBySecondNameAscFirstNameAscPatronymicAsc(long positionId);

    @Query("select e " +
            "from Position p " +
            "inner join " +
            "Employee e " +
            "on e.positionId = p.id " +
            "where p.departmentId = ?1 " +
            "order by e.secondName, e.firstName, e.patronymic")
    List<Employee> findAllByDepartmentId(long departmentId);
}
