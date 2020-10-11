package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.DayType;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DayTypeGenerator {

    private Random random = new Random(42);

    public DayType generate() {
        return generate(random.nextLong() + 1);
    }

    public DayType generate(long id) {
        return generate(id, true, true);
    }

    public DayType generate(long id,
                            boolean usePreviousValue) {
        return generate(id, false, usePreviousValue);
    }

    public DayType generate(long id,
                            boolean randomUsePreviousValue,
                            boolean usePreviousValue) {
        var dayType = new DayType();
        dayType.setId(id);
        dayType.setLabel("D_" + id);
        dayType.setName("Day type_" + id);
        dayType.setUsePreviousValue(randomUsePreviousValue ? random.nextBoolean() : usePreviousValue);
        return dayType;
    }

    public List<DayType> generateList() {
        return generateList(random.nextInt(4) + 1);
    }

    public List<DayType> generateList(int numberOfDayTypes) {
        return generateList(numberOfDayTypes, true, false);
    }

    public List<DayType> generateList(int numberOfDayTypes,
                                      boolean usePreviousValue) {
        return generateList(numberOfDayTypes, false, usePreviousValue);
    }

    public List<DayType> generateList(int numberOfDayTypes,
                                      boolean randomUsePreviousValue,
                                      boolean usePreviousValue) {
        var dayTypes = new ArrayList<DayType>();
        for (int i = 0; i < numberOfDayTypes; i++) {
            long id = (long) i + 1;
            var dayType = generate(id, randomUsePreviousValue, usePreviousValue);
            dayTypes.add(dayType);
        }
        return dayTypes;
    }
}
