package com.averude.uksatse.scheduler.core.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "work_schedule_views_day_types")
@IdClass(WorkScheduleViewDayType.PK.class)
public class WorkScheduleViewDayType implements Serializable {

    @Id
    @Column(name = "work_schedule_view_id")
    private Long workScheduleViewId;

    @Id
    @Column(name = "day_type_id")
    private Long dayTypeId;

    @Data
    @NoArgsConstructor
    public static class PK implements Serializable {
        private Long workScheduleViewId;
        private Long dayTypeId;
    }
}
