package repository;

import entity.Position;
import org.springframework.data.repository.CrudRepository;

public interface PositionRepository extends CrudRepository<Position, Long> {
    Iterable<Position> findAllByDepartmentId(Long departmentId);
}
