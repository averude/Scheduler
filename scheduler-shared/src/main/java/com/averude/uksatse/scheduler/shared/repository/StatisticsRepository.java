package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.core.entity.Position;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface StatisticsRepository extends Repository<Position, Long> {
    @Query("select new dto.CountDTO(p.id, count(e))" +
            "from Employee e " +
            "inner join " +
            "Position p " +
            "on e.positionId = p.id " +
            "where p.departmentId = ?1 " +
            "group by p.id")
    Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId);
}
