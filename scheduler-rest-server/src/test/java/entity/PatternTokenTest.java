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
public class PatternTokenTest {

    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private PatternToken patternToken;

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
        patternToken = new PatternToken();
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

        assertEquals(id, patternToken.getId());
        assertEquals(orderId, patternToken.getOrderId());
        assertEquals(patternId, patternToken.getPatternId());
        assertEquals(dayTypeId, patternToken.getDayTypeId());
        assertEquals(label, patternToken.getLabel());
        assertEquals(value, patternToken.getValue());
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

        Set<ConstraintViolation<PatternToken>> constraintViolations
                = validator.validate(patternToken);
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

        Set<ConstraintViolation<PatternToken>> constraintViolations
                = validator.validate(patternToken);
        assertFalse(constraintViolations.size() == 0);
    }



    private void initEntity(Long id,
                            Long orderId,
                            Long patternId,
                            Long dayTypeId,
                            String label,
                            Float value){
        patternToken.setId(id);
        patternToken.setOrderId(orderId);
        patternToken.setPatternId(patternId);
        patternToken.setDayTypeId(dayTypeId);
        patternToken.setLabel(label);
        patternToken.setValue(value);
    }
}
