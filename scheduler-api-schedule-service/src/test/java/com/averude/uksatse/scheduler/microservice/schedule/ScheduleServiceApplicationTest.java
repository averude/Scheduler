package com.averude.uksatse.scheduler.microservice.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.microservice.schedule.controller.ScheduleControllerImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.time.LocalDate;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@EnableTransactionManagement
@SpringBootTest
public class ScheduleServiceApplicationTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    ScheduleControllerImpl scheduleController;

    @Test
    @Transactional
    public void testScheduleGeneration() {
        LocalDate from = LocalDate.parse("2019-01-01");
        LocalDate to = LocalDate.parse("2019-01-31");

        Department department = new Department("Test department");
        entityManager.persist(department);

        ShiftPattern shiftPattern = new ShiftPattern("Test pattern");
        department.addPattern(shiftPattern);
        entityManager.persist(shiftPattern);

        Shift shift = new Shift();
        shift.setName("Test shift");
        department.addShift(shift);
        shiftPattern.addShift(shift);
        entityManager.persist(shift);

        Position position = new Position("Test position");
        department.addPosition(position);
        entityManager.persist(position);

        Employee employee = new Employee("Test", "Test", "Test");
        position.addEmployee(employee);
        shift.addEmployee(employee);
        entityManager.persist(employee);

        DayType dayType = new DayType();
        dayType.setLabel("T");
        dayType.setName("Test");
        entityManager.persist(dayType);

        PatternUnit unit = new PatternUnit();
        unit.setLabel("GT");
        unit.setOrderId(1L);
        unit.setValue(10F);
        shiftPattern.addPatternUnit(unit);
        dayType.addPatternUnit(unit);
        entityManager.persist(unit);

        WorkDay workDay = new WorkDay();
        workDay.setEmployeeId(employee.getId());
        workDay.setDate(LocalDate.parse("2019-01-02"));
        workDay.setHoliday(false);
        workDay.setDayTypeId(dayType.getId());
        workDay.setHours(12F);
        workDay.setLabel("T");
        entityManager.persist(workDay);

        entityManager.flush();

        scheduleController.generate(shift.getId(), from, to, 1);
    }
}