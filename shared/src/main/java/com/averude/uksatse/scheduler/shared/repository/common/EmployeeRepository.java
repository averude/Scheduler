package com.averude.uksatse.scheduler.shared.repository.common;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.util.Streamable;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeRepository extends IByDepartmentIdRepository<Employee, Long> {

    @Override
    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findAllByDepartmentId(Long departmentId);

    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findAllByPositionIdOrderBySecondNameAscFirstNameAscPatronymicAsc(long positionId);

    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findAllByDepartmentIdOrderById(Long departmentId);

    @Query("select e " +
            "from Employee e " +
            "inner join MainComposition mc " +
            "on mc.employeeId = e.id " +
            "where mc.shiftId in ?1 and ?2 <= mc.to and ?3 >= mc.from " +
            "order by mc.shiftId , e.secondName, e.firstName, e.patronymic")
    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findEmployeesByShiftIdsAndDatesBetween(List<Long> shiftIds,
                                                          LocalDate from,
                                                          LocalDate to);

    @Query("select e " +
            "from Employee e " +
            "inner join MainComposition mc " +
            "on mc.employeeId = e.id " +
            "where mc.shiftId = ?1 and ?2 <= mc.to and ?3 >= mc.from " +
            "order by e.id")
    @EntityGraph(value = "graph.Employee.position")
    Streamable<Employee> getAllEmployeesByMainShiftIdAndDateBetween(Long shiftId,
                                                                    LocalDate from,
                                                                    LocalDate to);

    @Query("select e " +
            "from Employee e " +
            "inner join SubstitutionComposition sc " +
            "on sc.employeeId = e.id " +
            "where sc.shiftId = ?1 and ?2 <= sc.to and ?3 >= sc.from " +
            "order by e.id")
    @EntityGraph(value = "graph.Employee.position")
    Streamable<Employee> getAllEmployeesBySubstitutionShiftIdAndDateBetween(Long shiftId,
                                                                            LocalDate from,
                                                                            LocalDate to);
}
