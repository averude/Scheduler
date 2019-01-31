package repository;

import entity.DayType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayTypeRepository extends CrudRepository<DayType, Long> {
}
