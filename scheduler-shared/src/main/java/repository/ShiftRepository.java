package repository;

import entity.Shift;
import org.springframework.data.repository.CrudRepository;

public interface ShiftRepository extends CrudRepository<Shift, Long> {
    Iterable<Shift> findAllByDepartmentId(long departmentId);
}
