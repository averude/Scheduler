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
public class PatternUnitTest {

    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private PatternUnit patternUnit;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[] {1L, 1L, 1L, 1L, "D", 8f},
                new Object[] {12L, 561L, 341L, 1L, "N1", 8.25f},
                new Object[] {31L, 18L, 156L, 156L, "N2", 12.0f},
                new Object[] {1L, 3L, 8L, 2L, "N2", 0f},
                new Object[] {7481L, 163L, Long.MAX_VALUE, 1L, " ", 16f}
        };
    }

    private static final Object[] getInvalidEntities(){
        return new Object[]{
                new Object[] {1L, 0L, 1L, 1L, "D", 1f},
                new Object[] {12L, -561L, 341L, 21L, "N1", 2f},
                new Object[] {411L, null, 81L, 61L, "N2", 3.25f},
                new Object[] {2L, 4L, 0L, 61L, "N2", 3.25f},
                new Object[] {1L, 3L, 8L, 0L, "N2", 3.25f},
                new Object[] {1L, 3L, 8L, 5L, "", 3.25f},
                new Object[] {1L, 3L, 8L, 2L, null, 0f},
                new Object[] {1L, 3L, 8L, 2L, "W", null},
                new Object[] {1L, 3L, 8L, 3L, "SUPER LABEL", 3.25f},
                new Object[] {1L, 3L, 8L, 4L, "N2", 25f},
        };
    }

    @Before
    public void setUp(){
        patternUnit = new PatternUnit();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                Long orderId,
                                                Long patternId,
                                                Long dayTypeId,
                                                String label,
                                                Float value){
        initEntity(id, orderId, patternId, dayTypeId, label, value);

        assertEquals(id, patternUnit.getId());
        assertEquals(orderId, patternUnit.getOrderId());
        assertEquals(patternId, patternUnit.getPatternId());
        assertEquals(dayTypeId, patternUnit.getDayTypeId());
        assertEquals(label, patternUnit.getLabel());
        assertEquals(value, patternUnit.getValue());
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessEntityValidation(Long id,
                                            Long orderId,
                                            Long patternId,
                                            Long dayTypeId,
                                            String label,
                                            Float value){
        initEntity(id, orderId, patternId, dayTypeId, label, value);

        Set<ConstraintViolation<PatternUnit>> constraintViolations
                = validator.validate(patternUnit);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                         Long orderId,
                                         Long patternId,
                                         Long dayTypeId,
                                         String label,
                                         Float value){
        initEntity(id, orderId, patternId, dayTypeId, label, value);

        Set<ConstraintViolation<PatternUnit>> constraintViolations
                = validator.validate(patternUnit);
        assertFalse(constraintViolations.size() == 0);
    }



    private void initEntity(Long id,
                            Long orderId,
                            Long patternId,
                            Long dayTypeId,
                            String label,
                            Float value){
        patternUnit.setId(id);
        patternUnit.setOrderId(orderId);
        patternUnit.setPatternId(patternId);
        patternUnit.setDayTypeId(dayTypeId);
        patternUnit.setLabel(label);
        patternUnit.setValue(value);
    }
}
