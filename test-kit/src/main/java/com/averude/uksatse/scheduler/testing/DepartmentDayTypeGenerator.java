package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DepartmentDayTypeGenerator {

    private Random random = new Random(42);
    private DayTypeGenerator dayTypeGenerator;

    public DepartmentDayTypeGenerator() {
        this.dayTypeGenerator = new DayTypeGenerator();
    }

    public DepartmentDayTypeGenerator(DayTypeGenerator dayTypeGenerator) {
        this.dayTypeGenerator = dayTypeGenerator;
    }

    public DepartmentDayType generate() {
        return generate(random.nextLong() + 1, dayTypeGenerator.generate());
    }

    public DepartmentDayType generate(DayType dayType) {
        return generate(random.nextLong() + 1, dayType);
    }

    public DepartmentDayType generate(long id, DayType dayType) {
        var departmentDayType = new DepartmentDayType();
        departmentDayType.setId(id);
        departmentDayType.setDayType(dayType);
        departmentDayType.setStartTime(480);
        departmentDayType.setEndTime(1005);
        departmentDayType.setBreakStartTime(600);
        departmentDayType.setBreakEndTime(660);
        return departmentDayType;
    }

    public List<DepartmentDayType> generateList() {
        return generateList(dayTypeGenerator.generateList());
    }

    public List<DepartmentDayType> generateList(List<DayType> dayTypes) {
        var departmentDayTypes = new ArrayList<DepartmentDayType>();
        dayTypes.forEach(dayType -> departmentDayTypes.add(generate(dayType.getId(), dayType)));
        return departmentDayTypes;
    }
}
