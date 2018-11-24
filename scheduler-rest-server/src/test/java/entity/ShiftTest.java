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
public class ShiftTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Shift shift;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[]{1L, "one", 2L},
                new Object[]{123L, "two", 123L},
                new Object[]{null, "три", 14L},
//                new Object[]{12L, "FOUR", null}
        };
    }

    private static final Object[] getInvalidEntities(){
        return new Object[]{
                new Object[]{1L, "e", 2L},
                new Object[]{0L, "two", 4L},
                new Object[]{-5L, "oh no", 123L},
                new Object[]{1L, "no way", 0L}
        };
    }

    @Before
    public void setUp(){
        shift = new Shift();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                String name,
                                                Long departmentId){
        initEntity(id, name, departmentId);

        assertEquals(id, shift.getId());
        assertEquals(name, shift.getName());
        assertEquals(departmentId, shift.getDepartmentId());
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
        Set<ConstraintViolation<Shift>> constraintViolations
                = validator.validate(shift);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                         String name,
                                         Long departmentId){
        initEntity(id, name, departmentId);
        Set<ConstraintViolation<Shift>> constraintViolations
                = validator.validate(shift);
        assertFalse(constraintViolations.size() == 0);
    }

    private void initEntity(Long id,
                            String name,
                            Long departmentId){
        shift.setId(id);
        shift.setName(name);
        shift.setDepartmentId(departmentId);
    }
}
