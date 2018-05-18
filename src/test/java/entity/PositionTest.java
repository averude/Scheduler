package entity;

import junitparams.JUnitParamsRunner;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.validation.Validation;
import javax.validation.Validator;

@RunWith(JUnitParamsRunner.class)
public class PositionTest {
    private static final Validator validator
            = Validation.buildDefaultValidatorFactory().getValidator();

    private Position position;

    @Before
    public void setUp(){
        position = new Position();
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
