package repository;

import dto.CountDTO;
import entity.Position;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface StatisticsRepository extends Repository<Position, Long> {
    @Query("select new dto.CountDTO(p.id, count(e))" +
            "from Employee e " +
            "inner join " +
            "Position p " +
            "on e.positionId = p.id " +
            "where p.departmentId = ?1 " +
            "group by e.positionId")
    Iterable<CountDTO> countEmployeesByDepartmentId(long departmentId);
}
