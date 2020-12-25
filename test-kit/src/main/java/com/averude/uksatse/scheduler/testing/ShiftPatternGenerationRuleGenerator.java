package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.core.entity.ShiftPatternGenerationRule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.*;

public class ShiftPatternGenerationRuleGenerator {

    private final Random random = new Random(42);

    public List<ShiftPatternGenerationRule> getGenerationRuleList(List<DayType> dayTypes,
                                                                  List<DepartmentDayType> departmentDayTypes){
        var types = new String[]{WEEKEND, EXTRA_WORK_DAY, HOLIDAY, EXTRA_WEEKEND};

        var result = new ArrayList<ShiftPatternGenerationRule>();

        var maxNumberOfRules = 4;
        var numberOrRules = random.nextInt(maxNumberOfRules - 1) + 1;

        for(int i = 0; i < numberOrRules; i++) {
            var rule = new ShiftPatternGenerationRule();
            rule.setOnDayTypeId(dayTypes.get(random.nextInt(dayTypes.size() - 1)).getId());
            rule.setUseDepartmentDayType(departmentDayTypes.get(random.nextInt(departmentDayTypes.size() - 1)));
            rule.setType(types[random.nextInt(types.length - 1)]);
            result.add(rule);
        }

        return result;
    }

    public List<ShiftPatternGenerationRule> getHolidayGenerationRuleList(DepartmentDayType departmentDayType) {
        var rule = new ShiftPatternGenerationRule();
        rule.setUseDepartmentDayType(departmentDayType);
        rule.setType(HOLIDAY);
        return Arrays.asList(rule);
    }
}
