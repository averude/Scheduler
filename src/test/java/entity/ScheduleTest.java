package entity;

import junitparams.JUnitParamsRunner;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.validation.Validation;
import javax.validation.Validator;

@RunWith(JUnitParamsRunner.class)
public class ScheduleTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Schedule schedule;

    @Before
    public void setUp(){
        schedule = new Schedule();
    }

    @Test
    public void testSuccessAccessToEntityFields(){

    }

    @Test
    public void testSuccessEntityCollections(){

    }

    @Test
    public void testSuccessEntityValidation(){

    }

    @Test
    public void testFailEntityValidation(){

    }

    private void initEntity(){

    }
}
