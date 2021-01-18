package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.dto.CountDTO;
import com.averude.uksatse.scheduler.core.model.entity.Position;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface StatisticsRepository extends Repository<Position, Long> {
    @Query("select new com.averude.uksatse.scheduler.core.model.dto.CountDTO(p.id, count(e))" +
            "from Employee e " +
            "inner join " +
            "Position p " +
            "on e.position = p " +
            "where p.departmentId = ?1 " +
            "group by p.id")
    List<CountDTO> countEmployeesOnPositionsByDepartmentId(long departmentId);
}
