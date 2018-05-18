package entity;

import junitparams.JUnitParamsRunner;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.validation.Validation;
import javax.validation.Validator;

@RunWith(JUnitParamsRunner.class)
public class ShiftTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Shift shift;

    @Before
    public void setUp(){
        shift = new Shift();
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
