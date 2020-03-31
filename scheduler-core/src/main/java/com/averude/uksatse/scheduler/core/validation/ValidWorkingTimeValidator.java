package com.averude.uksatse.scheduler.core.validation;

import com.averude.uksatse.scheduler.core.entity.HasTime;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidWorkingTimeValidator implements ConstraintValidator<ValidWorkingTime, HasTime> {

    @Override
    public void initialize(ValidWorkingTime constraintAnnotation) {
    }

    @Override
    public boolean isValid(HasTime hasTime, ConstraintValidatorContext constraintValidatorContext) {
        if (checkForNulls(hasTime)) {
            return true;
        } else {
            if (checkWorkTimeFields(hasTime)) {
                if (checkBreakTimeFields(hasTime)) {
                    return checkTimeSequence(hasTime);
                } else {
                    return checkWorkTimeSequence(hasTime);
                }
            } else {
                return false;
            }
        }
    }

    private boolean checkForNulls(HasTime hasTime) {
        return hasTime == null || (hasTime.getStartTime() == null && hasTime.getEndTime() == null
                && hasTime.getBreakStartTime() == null && hasTime.getBreakEndTime() == null);
    }

    private boolean checkBreakTimeFields(HasTime hasTime) {
        return hasTime.getBreakEndTime() != null && hasTime.getBreakStartTime() != null
                && checkTime(hasTime.getBreakEndTime()) && checkTime(hasTime.getBreakStartTime());
    }

    private boolean checkWorkTimeFields(HasTime hasTime) {
        return hasTime.getEndTime() != null && hasTime.getStartTime() != null
                && checkTime(hasTime.getEndTime()) && checkTime(hasTime.getStartTime());
    }

    private boolean checkWorkTimeSequence(HasTime hasTime) {
        return hasTime.getEndTime() > hasTime.getStartTime();
    }

    private boolean checkTimeSequence(HasTime hasTime) {
        return (hasTime.getEndTime() > hasTime.getStartTime())
                && (hasTime.getBreakEndTime() > hasTime.getBreakStartTime())
                && (hasTime.getEndTime() > hasTime.getBreakEndTime())
                && (hasTime.getBreakStartTime() > hasTime.getStartTime())
                && (workDuration(hasTime)) > (breakDuration(hasTime));
    }

    private boolean checkTime(Integer time) {
        return time >= 0 && time <= 1440;
    }

    private int workDuration(HasTime hasTime) {
        return hasTime.getEndTime() - hasTime.getStartTime();
    }

    private int breakDuration(HasTime hasTime) {
        return hasTime.getBreakEndTime() - hasTime.getBreakStartTime();
    }
}
