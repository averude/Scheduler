package entity;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.*;

@RunWith(JUnitParamsRunner.class)
public class EmployeeTest {

    private static final Object[] getEmployees() {
        return new Object[] {
                new Object[] {"Charles", "Bronks", 1L, 1L, 1L},
                new Object[] {"Frank", "Lampard", 10L, 269L, 589L},
                new Object[] {"Richard", "Hopkins", -1L, -1L, -1L},
                new Object[] {"Tobby", "Bryan", 123L, 145L, 23L},
                new Object[] {"Castor", "Troy", 12L, 123L, 546L}
        };
    }

    @Test
    @Parameters(method = "getEmployees")
    public void testSuccessEmployeeFields(String firstName,
                                   String secondName,
                                   Long posId,
                                   Long shId,
                                   Long id){
        Employee employee = new Employee();
        employee.setId(id);
        employee.setFirstName(firstName);
        employee.setSecondName(secondName);
        employee.setPositionId(posId);
        employee.setShiftId(shId);

        assertEquals(id, employee.getId());
        assertEquals(firstName, employee.getFirstName());
        assertEquals(secondName, employee.getSecondName());
        assertEquals(posId, employee.getPositionId());
        assertEquals(shId, employee.getShiftId());
    }

    @Test
    public void testSuccessEmployeeCollection(){
        Employee employee = new Employee();
        Schedule schedule = new Schedule();

        employee.addSchedule(schedule);
        assertEquals(1, employee.getSchedule().size());
        assertTrue(employee.getSchedule().contains(schedule));

        employee.removeSchedule(schedule);
        assertEquals(0, employee.getSchedule().size());
        assertFalse(employee.getSchedule().contains(schedule));
    }

    // Validation tests
}
