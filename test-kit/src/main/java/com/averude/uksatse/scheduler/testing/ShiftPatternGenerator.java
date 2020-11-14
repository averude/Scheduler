package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;

import java.util.Arrays;
import java.util.List;

public class ShiftPatternGenerator {

    private DepartmentDayTypeGenerator departmentDayTypeGenerator;

    public ShiftPatternGenerator() {
        this.departmentDayTypeGenerator = new DepartmentDayTypeGenerator();
    }

    public ShiftPatternGenerator(DepartmentDayTypeGenerator departmentDayTypeGenerator) {
        this.departmentDayTypeGenerator = departmentDayTypeGenerator;
    }

    public ShiftPattern generateShiftPattern() {
        var departmentDayTypes = departmentDayTypeGenerator.generateList();
        return generateShiftPattern(departmentDayTypes);
    }

    public ShiftPattern generateShiftPattern(List<DepartmentDayType> departmentDayTypes) {
        var workDayType = departmentDayTypes.get(0);
        var weekendDayType = departmentDayTypes.get(1);
        var firstUnit = new PatternUnit(workDayType);
        var secondUnit = new PatternUnit(weekendDayType);

        var pattern = new ShiftPattern();
        pattern.setHolidayDepDayType(weekendDayType);
        pattern.setExtraWeekendDepDayType(weekendDayType);
        pattern.setExtraWorkDayDepDayType(workDayType);
        pattern.setSequence(Arrays.asList(firstUnit, secondUnit));
        return pattern;
    }
}
