package com.averude.uksatse.scheduler.microservice.admin.controller.microservice;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.microservice.admin.controller.DayTypeControllerImpl;
import com.averude.uksatse.scheduler.microservice.admin.controller.DepartmentControllerImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.ConstraintViolationException;

import java.util.Optional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AdminServiceApplicationTest {
    //Day Type Controller Test
    @Autowired
    private DayTypeControllerImpl dayTypeController;

    @Test
    public void testDayTypeController() {
        DayType validDayType = new DayType("Test", "T");

        dayTypeController.add(validDayType);

        Optional<DayType> result = dayTypeController.get(validDayType.getId());
        assertTrue(result.isPresent());
        result.ifPresent(value -> {
            assertNotNull(value.getId());
            assertNotNull(value.getLabel());
            assertNotNull(value.getName());
            assertEquals(value.getId(), validDayType.getId());
            assertEquals(value, validDayType);
        });

        validDayType.setLabel("T1");
        dayTypeController.put(validDayType.getId(), validDayType);
        result = dayTypeController.get(validDayType.getId());
        assertTrue(result.isPresent());
        result.ifPresent(value -> {
            assertNotNull(value.getId());
            assertNotNull(value.getLabel());
            assertNotNull(value.getName());
            assertEquals(value.getId(), validDayType.getId());
            assertEquals(value, validDayType);
        });

        dayTypeController.delete(validDayType.getId());
        result = dayTypeController.get(validDayType.getId());
        assertFalse(result.isPresent());
    }

    @Test(expected = ConstraintViolationException.class)
    public void testDayTypeControllerNonValidRequest() {
        DayType nonValidDayType = new DayType(null, null);
        dayTypeController.add(nonValidDayType);
    }

    // Department Controller Test
    @Autowired
    private DepartmentControllerImpl departmentController;

    @Test
    public void testDepartmentController() {
        Department validDepartment = new Department("Test department");

        departmentController.add(validDepartment);

        Optional<Department> result = departmentController.get(validDepartment.getId());
        assertTrue(result.isPresent());
        result.ifPresent(value -> {
            assertNotNull(value.getId());
            assertNotNull(value.getName());
            assertEquals(value.getId(), validDepartment.getId());
            assertEquals(value, validDepartment);
        });

        validDepartment.setName("Another name");
        departmentController.update(validDepartment.getId(), validDepartment);
        result = departmentController.get(validDepartment.getId());
        assertTrue(result.isPresent());
        result.ifPresent(value -> {
            assertNotNull(value.getId());
            assertNotNull(value.getName());
            assertEquals(value.getId(), validDepartment.getId());
            assertEquals(value, validDepartment);
        });

        departmentController.delete(validDepartment.getId());
        result = departmentController.get(validDepartment.getId());
        assertFalse(result.isPresent());
    }

    @Test(expected = ConstraintViolationException.class)
    public void testDepartmentControllerNonValidRequest() {
        Department nonValidDepartment = new Department("");
        departmentController.add(nonValidDepartment);
    }
}
