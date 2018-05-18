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
public class DayTypeTest{

    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private DayType dayType;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[] {1L, "one", 1L, 1L, 1f},
                new Object[] {12L, "two", 561L, 341L, 21f},
                new Object[] {31L, "three", 18L, 156L, 156f},
                new Object[] {411L, "четыре", 81L, 61L, 45f},
                new Object[] {145L, "five", 135L, 717L, 156f},
                new Object[] {7481L, "six", 163L, Long.MAX_VALUE, 1f}
        };
    }

    private static final Object[] getInvalidEntities(){
        return new Object[]{
                new Object[] {1L, "one", 0L, 1L, 1f},
                new Object[] {12L, "two", -561L, 341L, 21f},
                new Object[] {31L, "", 18L, 156L, 156f},
                new Object[] {411L, null, 81L, 61L, 45f},
                new Object[] {145L, "f", 135L, 717L, 156f},
                new Object[] {7481L, "si", 163L, Long.MAX_VALUE, 1f}
        };
    }

    @Before
    public void setUp(){
        dayType = new DayType();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                String name,
                                                Long orderId,
                                                Long patternId,
                                                Float value){
        initEntity(id, name, orderId, patternId, value);

        assertEquals(id, dayType.getId());
        assertEquals(name, dayType.getName());
        assertEquals(orderId, dayType.getOrderId());
        assertEquals(patternId, dayType.getPatternId());
        assertEquals(value, dayType.getValue());
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessEntityValidation(Long id,
                                            String name,
                                            Long orderId,
                                            Long patternId,
                                            Float value){
        initEntity(id, name, orderId, patternId, value);

        Set<ConstraintViolation<DayType>> constraintViolations
                = validator.validate(dayType);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                         String name,
                                         Long orderId,
                                         Long patternId,
                                         Float value){
        initEntity(id, name, orderId, patternId, value);

        Set<ConstraintViolation<DayType>> constraintViolations
                = validator.validate(dayType);
        assertFalse(constraintViolations.size() == 0);
    }



    private void initEntity(Long id,
                            String name,
                            Long orderId,
                            Long patternId,
                            Float value){
        dayType.setId(id);
        dayType.setName(name);
        dayType.setOrderId(orderId);
        dayType.setPatternId(patternId);
        dayType.setValue(value);
    }
}
