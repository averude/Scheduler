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
public class ShiftPatternTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private ShiftPattern pattern;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[]{1L, "one", 2L},
                new Object[]{null, "two", 123L},
                new Object[]{4134L, "три", 14L},
                new Object[]{12L, "FOUR", 78L}
        };
    }

    private static final Object[] getInvalidEntities(){
        return new Object[]{
                new Object[]{1L, "e", 2L},
                new Object[]{0L, "two", 4L},
                new Object[]{-5L, "oh no", 123L},
                new Object[]{1L, "no way", null}
        };
    }

    @Before
    public void setUp(){
        pattern = new ShiftPattern();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                String name,
                                                Long departmentId){
        initEntity(id, name, departmentId);

        assertEquals(id, pattern.getId());
        assertEquals(name, pattern.getName());
        assertEquals(departmentId, pattern.getDepartmentId());
    }

    @Test
    public void testSuccessEntityCollections(){

    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessEntityValidation(Long id,
                                            String name,
                                            Long departmentId){
        initEntity(id, name, departmentId);
        Set<ConstraintViolation<ShiftPattern>> constraintViolations
                = validator.validate(pattern);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                         String name,
                                         Long departmentId){
        initEntity(id, name, departmentId);
        Set<ConstraintViolation<ShiftPattern>> constraintViolations
                = validator.validate(pattern);
        assertFalse(constraintViolations.size() == 0);
    }

    private void initEntity(Long id,
                            String name,
                            Long departmentId){
        pattern.setId(id);
        pattern.setName(name);
        pattern.setDepartmentId(departmentId);
    }
}
