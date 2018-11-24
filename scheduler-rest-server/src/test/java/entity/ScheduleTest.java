package entity;

import junitparams.JUnitParamsRunner;
import junitparams.Parameters;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.time.LocalDate;
import java.util.Set;

import static org.junit.Assert.*;

@RunWith(JUnitParamsRunner.class)
public class ScheduleTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Schedule schedule;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[]{1L, 8F, 5L, LocalDate.parse("2018-05-01"), false},
                new Object[]{null, 4.5F, 153L, LocalDate.parse("2012-02-21"), false},
                new Object[]{231L, 5F, 135135L, LocalDate.parse("2014-03-29"), true},
                new Object[]{Long.MAX_VALUE, 11.5F, 1L, LocalDate.parse("2014-05-26"), false}
        };
    }

    private static final Object[] getInvalidEntities(){
        return new Object[]{
                new Object[]{-1L, 8F, 123L, LocalDate.parse("2018-02-02"), false},
                new Object[]{0L, 8F, 123L, LocalDate.parse("2018-02-02"), false},
                new Object[]{123L, 51F, 12L, LocalDate.parse("2018-02-02"), false},
                new Object[]{41L, 3F, -5L, LocalDate.parse("2018-03-02"), false},
                new Object[]{4151L, 3F, 67L, LocalDate.parse("2018-03-02"), null},
                new Object[]{4151L, null, 67L, LocalDate.parse("2018-03-02"), false},
                new Object[]{4151L, 3F, null, LocalDate.parse("2018-03-02"), true},
                new Object[]{41L, 6.5F, 5L, null, false}
        };
    }

    @Before
    public void setUp(){
        schedule = new Schedule();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                Float hours,
                                                Long employeeId,
                                                LocalDate date,
                                                Boolean isHoliday){
        initEntity(id, hours, employeeId, date, isHoliday);

        assertEquals(id, schedule.getId());
        assertEquals(hours, schedule.getHours());
        assertEquals(employeeId, schedule.getEmployeeId());
        assertEquals(date, schedule.getDate());
        assertEquals(isHoliday, schedule.getHoliday());
    }

    @Test
    public void testSuccessEntityCollections(){

    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessEntityValidation(Long id,
                                            Float hours,
                                            Long employeeId,
                                            LocalDate date,
                                            Boolean isHoliday){
        initEntity(id, hours, employeeId, date, isHoliday);
        Set<ConstraintViolation<Schedule>> constraintViolations
                = validator.validate(schedule);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                         Float hours,
                                         Long employeeId,
                                         LocalDate date,
                                         Boolean isHoliday){
        initEntity(id, hours, employeeId, date, isHoliday);
        Set<ConstraintViolation<Schedule>> constraintViolations
                = validator.validate(schedule);
        for (ConstraintViolation<Schedule> cv : constraintViolations){
            System.out.println(cv.getMessage());
        }
        assertFalse(constraintViolations.size() == 0);
    }

    private void initEntity(Long id,
                            Float hours,
                            Long employeeId,
                            LocalDate date,
                            Boolean isHoliday){
        schedule.setId(id);
        schedule.setHours(hours);
        schedule.setEmployeeId(employeeId);
        schedule.setDate(date);
        schedule.setHoliday(isHoliday);
    }
}
