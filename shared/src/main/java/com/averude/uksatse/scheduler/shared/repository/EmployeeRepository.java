package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Employee;
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
            "inner join MainShiftComposition msc " +
            "on msc.employeeId = e.id " +
            "where msc.shiftId = ?1 and ?2 <= msc.to and ?3 >= msc.from " +
            "order by msc.shiftId , e.secondName, e.firstName, e.patronymic")
    @EntityGraph(value = "graph.Employee.position")
    List<Employee> findEmployeesByShiftIdAndDatesBetween(Long shiftId,
                                                         LocalDate from,
                                                         LocalDate to);

    @Query("select e " +
            "from Employee e " +
            "inner join MainShiftComposition msc " +
            "on msc.employeeId = e.id " +
            "where msc.shiftId = ?1 and ?2 <= msc.to and ?3 >= msc.from " +
            "order by e.id")
    @EntityGraph(value = "graph.Employee.position")
    Streamable<Employee> getAllEmployeesByMainShiftIdAndDateBetween(Long shiftId,
                                                                    LocalDate from,
                                                                    LocalDate to);

    @Query("select e " +
            "from Employee e " +
            "inner join SubstitutionShiftComposition ssc " +
            "on ssc.employeeId = e.id " +
            "where ssc.shiftId = ?1 and ?2 <= ssc.to and ?3 >= ssc.from " +
            "order by e.id")
    @EntityGraph(value = "graph.Employee.position")
    Streamable<Employee> getAllEmployeesBySubstitutionShiftIdAndDateBetween(Long shiftId,
                                                                            LocalDate from,
                                                                            LocalDate to);
}
