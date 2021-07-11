package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdAndDateRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.time.LocalDate;
import java.util.List;

public interface WorkingNormRepository extends IByDepartmentIdAndDateRepository<WorkingNorm, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<WorkingNorm> findAllByShiftIdAndDateBetweenOrderByDateAsc(Long shiftId, LocalDate from, LocalDate to);

    void deleteAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to);
}
