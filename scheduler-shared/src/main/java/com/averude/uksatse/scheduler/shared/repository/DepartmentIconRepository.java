package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.DepartmentIcon;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DepartmentIconRepository extends CrudRepository<DepartmentIcon, Long> {

    @Query("select di " +
            "from DepartmentIcon as di " +
            "left join Department as d " +
            "on di.id = d.iconId " +
            "where d.id = ?1")
    Optional<DepartmentIcon> getDepartmentIconByDepartmentId(Long departmentId);
}
