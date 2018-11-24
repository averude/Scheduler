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
public class PositionTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Position position;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[]{1L, "one", 2L},
                new Object[]{123L, "two", 123L},
                new Object[]{null, "три", 14L},
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
        position = new Position();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                String name,
                                                Long departmentId){
        initEntity(id, name, departmentId);

        assertEquals(id, position.getId());
        assertEquals(name, position.getName());
        assertEquals(departmentId, position.getDepartmentId());
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
        Set<ConstraintViolation<Position>> constraintViolations
                = validator.validate(position);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                         String name,
                                         Long departmentId){
        initEntity(id, name, departmentId);
        Set<ConstraintViolation<Position>> constraintViolations
                = validator.validate(position);
        assertFalse(constraintViolations.size() == 0);
    }

    private void initEntity(Long id,
                            String name,
                            Long departmentId){
        position.setId(id);
        position.setName(name);
        position.setDepartmentId(departmentId);
    }
}
