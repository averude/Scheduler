package entity;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EmployeeTest {

    private String firstName = "Charles";
    private String secondName = "Bronks";
    private Long posId = 1L;
    private Long shId = 1L;
    private Long id = 1L;

    private Employee employee = new Employee();

    @BeforeAll
    void initTest(){
        employee.setId(id);
        employee.setFirstName(firstName);
        employee.setSecondName(secondName);
        employee.setPositionId(posId);
        employee.setShiftId(shId);
    }

    @Test
    void testSuccessEmployeeFields(){
        assertEquals(id, employee.getId());
        assertEquals(firstName, employee.getFirstName());
        assertEquals(secondName, employee.getSecondName());
        assertEquals(posId, employee.getPositionId());
        assertEquals(shId, employee.getShiftId());
    }

    @Test
    void testSuccessEmployeeCollection(){
        Schedule s = new Schedule();

        employee.addSchedule(s);
        assertEquals(1, employee.getSchedule().size());
        assertTrue(employee.getSchedule().contains(s));

        employee.removeSchedule(s);
        assertEquals(0, employee.getSchedule().size());
        assertFalse(employee.getSchedule().contains(s));
    }

    // Validation tests
}
