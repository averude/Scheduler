package com.averude.uksatse.scheduler.microservice.statistics.microservice;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.microservice.statistics.controller.StatisticsControllerImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@EnableTransactionManagement
@SpringBootTest
public class StatisticsServiceApplicationTest {
    @Autowired
    EntityManager entityManager;

    @Autowired
    StatisticsControllerImpl statisticsController;

    @Test
    @Transactional
    public void test() {
        // Prepare data
        Department department = new Department("Test department");
        entityManager.persist(department);
        Position position = new Position("Test position");
        department.addPosition(position);
        entityManager.persist(position);
        Employee employee = new Employee("First", "Patronymic", "Second");
        position.addEmployee(employee);
        entityManager.persist(employee);
        entityManager.flush();

        // Get data from controller
        Iterable<CountDTO> result = statisticsController
                .getNumberOfEmployeesInPositionsByDepartmentId(department.getId());

        // Assert
        for (CountDTO countDTO : result) {
            assertEquals(countDTO.getId(), position.getId());
            assertEquals(countDTO.getCount(), new Long(1L));
        }
    }
}
