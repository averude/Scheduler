package entity;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

import static org.junit.Assert.*;

@RunWith(JUnitParamsRunner.class)
public class EmployeeTest {

    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Employee employee;

    private static final Object[] getValidEmployees() {
        return new Object[] {
                new Object[] {"Charles", "Bronks", 1L, 1L, 1L},
                new Object[] {"Frank", "Lampard", 10L, 269L, 589L},
                new Object[] {"Tobby", "Bryan", 123L, 145L, 23L},
                new Object[] {"Castor", "Troy", 12L, 123L, 546L}
        };
    }

    private static final Object[] getInvalidEmployees() {
        return new Object[] {
                new Object[] {"Ch", "Bronks", -1L, 1L, 1L},
                new Object[] {"+", "Lampard", 10L, 269L, 589L},
                new Object[] {"Richard", "/", -1L, -1L, -1L},
                new Object[] {"%", "Bryan", 123L, Long.MAX_VALUE, 23L},
                new Object[] {"Castor", "T", -12L, 123L, 546L}
        };
    }

    @Before
    public void setUp(){
        employee = new Employee();
    }

    @Test
    @Parameters(method = "getValidEmployees")
    public void testSuccessEmployeeFields(String firstName,
                                          String secondName,
                                          Long posId,
                                          Long shId,
                                          Long id){
        initEmployee(firstName, secondName, posId, shId, id);

        assertEquals(id, employee.getId());
        assertEquals(firstName, employee.getFirstName());
        assertEquals(secondName, employee.getSecondName());
        assertEquals(posId, employee.getPositionId());
        assertEquals(shId, employee.getShiftId());
    }

    @Test
    public void testSuccessEmployeeCollection(){
        Schedule schedule1 = new Schedule();
        Schedule schedule2 = new Schedule();

        schedule1.setHours(8f);
        schedule2.setHours(7f);

        employee.addSchedule(schedule1);
        assertEquals(1, employee.getSchedule().size());
        assertTrue(employee.getSchedule().contains(schedule1));

        employee.addSchedule(schedule2);
        assertEquals(2, employee.getSchedule().size());
        assertTrue(employee.getSchedule().contains(schedule2));

        employee.removeSchedule(schedule1);
        assertEquals(1, employee.getSchedule().size());
        assertFalse(employee.getSchedule().contains(schedule1));
    }

    // Validation tests
    @Test
    @Parameters(method = "getValidEmployees")
    public void testSuccessEmployeeValidation(String firstName,
                                              String secondName,
                                              Long posId,
                                              Long shId,
                                              Long id){
        initEmployee(firstName, secondName, posId, shId, id);

        Set<ConstraintViolation<Employee>> constraintViolations
                = validator.validate(employee);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEmployees")
    public void testFailEmployeeValidation(String firstName,
                                           String secondName,
                                           Long posId,
                                           Long shId,
                                           Long id){
        initEmployee(firstName, secondName, posId, shId, id);

        Set<ConstraintViolation<Employee>> constraintViolations
                = validator.validate(employee);
        assertFalse(constraintViolations.size() == 0);
    }

    private void initEmployee(String firstName,
                              String secondName,
                              Long posId,
                              Long shId,
                              Long id){
        employee.setId(id);
        employee.setFirstName(firstName);
        employee.setSecondName(secondName);
        employee.setPositionId(posId);
        employee.setShiftId(shId);
    }
}