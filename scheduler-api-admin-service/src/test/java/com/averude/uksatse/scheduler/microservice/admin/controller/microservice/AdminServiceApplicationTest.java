package com.averude.uksatse.scheduler.microservice.admin.controller.microservice;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.microservice.admin.controller.DayTypeControllerImpl;
import com.averude.uksatse.scheduler.microservice.admin.controller.DepartmentControllerImpl;
import com.averude.uksatse.scheduler.microservice.admin.controller.EmployeeControllerImpl;
import com.averude.uksatse.scheduler.microservice.admin.controller.PositionControllerImpl;
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
        dayTypeController.put(validDayType);
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
        departmentController.update(validDepartment);
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

    @Autowired
    PositionControllerImpl positionController;
    @Autowired
    EmployeeControllerImpl employeeController;

    @Test
    public void testUpdateChildEntity() {
        Department validDepartment = new Department("Test department");

        departmentController.add(validDepartment);

        Position position = new Position();
        position.setName("Position");
        position.setDepartmentId(validDepartment.getId());
        positionController.create(position);

        Employee employee = new Employee("ETET", "ETETET", "etwetwt");
        employee.setPositionId(position.getId());
        employeeController.create(employee);

        employeeController.get(employee.getId())
                .ifPresent(emp -> System.out.println(emp.getFirstName()));

        Position uPosition = new Position();
        uPosition.setId(position.getId());
        uPosition.setDepartmentId(validDepartment.getId());
        uPosition.setName("Another");
        positionController.update(uPosition);

        employeeController.get(employee.getId())
                .ifPresent(emp -> System.out.println(emp.getFirstName()));
        positionController.get(position.getId())
                .ifPresent(pos -> System.out.println(pos.getName()));

        departmentController.delete(validDepartment.getId());

        positionController.get(position.getId())
                .ifPresent(pos -> System.out.println(pos.getName()));
    }
}
