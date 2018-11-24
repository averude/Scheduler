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
public class DepartmentTest {

    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Department department;

    private static final Object[] getValidEntities(){
        return new Object[]{
                new Object[] {34L, "one"},
                new Object[] {11111L, "two"},
                new Object[] {678L, "three"},
                new Object[] {13l, "четыре"},
                new Object[] {14L, "five"},
                new Object[] {Long.MAX_VALUE, "six"}
        };
    }

    private static final Object[] getInvalidEntities(){
        return new Object[]{
                new Object[] {0L, "one"},
                new Object[] {-132L, "two"},
                new Object[] {81L, "ч"},
                new Object[] {135L, ""}
        };
    }

    @Before
    public void setUp(){
        department = new Department();
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessAccessToEntityFields(Long id,
                                                String name){
        initEntity(id, name);

        assertEquals(id, department.getId());
        assertEquals(name, department.getName());
    }

    @Test
    public void testSuccessEntityCollections(){
        Position position1 = new Position();
        Position position2 = new Position();

        position1.setName("First");
        position2.setName("Second");

        department.addPosition(position1);
        assertEquals(1, department.getPositions().size());
        assertTrue(department.getPositions().contains(position1));

        department.addPosition(position2);
        assertEquals(2, department.getPositions().size());
        assertTrue(department.getPositions().contains(position2));

        department.removePosition(position1);
        assertEquals(1, department.getPositions().size());
        assertFalse(department.getPositions().contains(position1));

        ShiftPattern pattern1 = new ShiftPattern("One");
        ShiftPattern pattern2 = new ShiftPattern("Two");

        department.addPattern(pattern1);
        assertEquals(1, department.getPatterns().size());
        assertTrue(department.getPatterns().contains(pattern1));

        department.addPattern(pattern2);
        assertEquals(2, department.getPatterns().size());
        assertTrue(department.getPatterns().contains(pattern2));

        department.removePattern(pattern1);
        assertEquals(1, department.getPatterns().size());
        assertFalse(department.getPatterns().contains(pattern1));
    }

    @Test
    @Parameters(method = "getValidEntities")
    public void testSuccessEntityValidation(Long id,
                                                String name){
        initEntity(id, name);

        Set<ConstraintViolation<Department>> constraintViolations
                = validator.validate(department);
        assertTrue(constraintViolations.size() == 0);
    }

    @Test
    @Parameters(method = "getInvalidEntities")
    public void testFailEntityValidation(Long id,
                                             String name){
        initEntity(id, name);

        Set<ConstraintViolation<Department>> constraintViolations
                = validator.validate(department);
        assertFalse(constraintViolations.size() == 0);
    }

    private void initEntity(Long id,
                            String name){
        department.setId(id);
        department.setName(name);
    }
}
