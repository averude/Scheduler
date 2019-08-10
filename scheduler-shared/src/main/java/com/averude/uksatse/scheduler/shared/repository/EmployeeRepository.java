package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    Iterable<Employee> findAllByPositionIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(long positionId);

    @Query("select e " +
            "from Position p " +
            "inner join " +
            "Employee e " +
            "on e.positionId = p.id " +
            "where p.departmentId = ?1 " +
            "order by e.shiftId, e.secondName, e.firstName, e.patronymic")
    Iterable<Employee> findAllByDepartmentId(long departmentId);

    Iterable<Employee> findAllByShiftIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(long shiftId);

}
