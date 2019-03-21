package com.averude.uksatse.scheduler.microservice.statistics.microservice;

import com.averude.uksatse.scheduler.core.dto.CountDTO;
import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.microservice.statistics.controller.StatisticsControllerImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@EnableTransactionManagement
@SpringBootTest
public class StatisticsServiceApplicationTest {
    @Mock
    OAuth2Authentication authentication;
    @Mock
    OAuth2AuthenticationDetails details;
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

        Map<String, Object> decodedDetails = getDecodedDetails(department);
        when(authentication.getDetails()).thenReturn(details);
        when(details.getDecodedDetails()).thenReturn(decodedDetails);

        // Get data from controller
        Iterable<CountDTO> result = statisticsController
                .getNumberOfEmployeesInPositionsByDepartmentId(authentication);

        // Assert
        for (CountDTO countDTO : result) {
            assertEquals(countDTO.getId(), position.getId());
            assertEquals(countDTO.getCount(), new Long(1L));
        }
    }

    private Map<String, Object> getDecodedDetails(Department department) {
        Map<String, Object> decodedDetails = new HashMap<>();
        decodedDetails.put("department_id", department.getId());
        return decodedDetails;
    }
}
