package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<WorkDay, Long> {
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<WorkDay> findAllByDepartmentIdAndEmployeeIdAndDateBetweenOrderByDateAsc(long departmentId,
                                                                                 long employeeId,
                                                                                 LocalDate from,
                                                                                 LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select wd " +
            "from WorkDay wd " +
            "where wd.departmentId = ?1 and wd.employeeId in ?2 and wd.date between ?3 and ?4 " +
            "order by wd.employeeId asc, wd.date asc")
    List<WorkDay> findAllByEmployeeIdsAndDateBetween(Long departmentId,
                                                     List<Long> employeeIds,
                                                     LocalDate from,
                                                     LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select wd " +
            "from WorkDay wd " +
            "where wd.departmentId = ?1 and wd.date between ?2 and ?3 " +
            "order by wd.employeeId asc, wd.date asc")
    List<WorkDay> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                      LocalDate from,
                                                      LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select wd " +
            "from WorkDay wd " +
            "where wd.departmentId = ?1 " +
                "and wd.scheduledDayTypeId in ?2 " +
                "and wd.actualDayTypeId is NULL " +
                "and wd.date between ?3 and ?4 " +
            "order by wd.employeeId asc, wd.date asc")
    List<WorkDay> findAllByDepartmentIdAndDayTypeIdInAndDateBetween(Long departmentId,
                                                                    List<Long> dayTypeIds,
                                                                    LocalDate from,
                                                                    LocalDate to);
}
