package com.averude.uksatse.scheduler.core.validation;

import com.averude.uksatse.scheduler.core.entity.HasTime;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class ValidWorkingTimeValidatorTest {
    private ValidWorkingTimeValidator timeValidator = new ValidWorkingTimeValidator();

//    @Test
    public void isValid() {
        assertTrue(validate(createHasTimeObject(400, 1200, 450, 600)));
        assertTrue(validate(createHasTimeObject(400, 1200, null, null)));
        assertTrue(validate(createHasTimeObject(null, null, null, null)));

        assertFalse(validate(createHasTimeObject(null, 1200, 450, 600)));
        assertFalse(validate(createHasTimeObject(400, 1200, null, 600)));
        assertFalse(validate(createHasTimeObject(400, 1450, 450, 600)));
        assertFalse(validate(createHasTimeObject(1450, 1200, 450, 600)));
        assertFalse(validate(createHasTimeObject(400, 1200, 1450, 600)));
        assertFalse(validate(createHasTimeObject(400, 1200, 450, 1450)));
    }

    private boolean validate(HasTime hasTime) {
        return timeValidator.isValid(hasTime, null);
    }

    private HasTime createHasTimeObject(Integer startTime,
                                        Integer endTime,
                                        Integer breakStartTime,
                                        Integer breakEndTime) {
        return null;
    }
}
