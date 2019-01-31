package repository;

import entity.ShiftPattern;
import org.springframework.data.repository.CrudRepository;

public interface ShiftPatternRepository extends CrudRepository<ShiftPattern, Long> {
    Iterable<ShiftPattern> findAllByDepartmentId(long departmentId);
}
