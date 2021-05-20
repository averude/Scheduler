package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleViewDayType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkScheduleViewDayTypeRepository extends JpaRepository<WorkScheduleViewDayType, WorkScheduleViewDayType.PK> {

    void deleteAllByWorkScheduleViewIdAndDayTypeIdNotIn(Long workScheduleViewId, List<Long> dayTypeIds);

}
