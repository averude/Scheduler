package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.SummationColumnDayTypeRange;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.core.entity.SummationColumnType.COUNT;
import static com.averude.uksatse.scheduler.core.entity.SummationColumnType.HOURS_SUM;

public class SummationColumnGenerator {

    private Random random = new Random(42);
    private String[] types = new String[]{COUNT, HOURS_SUM};

    public List<SummationColumn> getSummationColumns(List<DayType> dayTypes) {
        var ranges = getRanges(dayTypes);
        return getBounds(ranges);
    }

    public List<SummationColumnDayTypeRange> getRanges(List<DayType> dayTypes) {
        return dayTypes.stream()
                .map(this::fromDayType)
                .collect(Collectors.toList());
    }

    public List<SummationColumn> getBounds(List<SummationColumnDayTypeRange> ranges) {
        var result = new ArrayList<SummationColumn>();

        for (int i = 0; i < ranges.size(); i++) {
            var summationColumn = new SummationColumn();
            long id = i + 1;
            summationColumn.setId(id);
            summationColumn.setDayTypeRanges(Set.of(ranges.get(i)));
            summationColumn.setEnterpriseId(1L);
            summationColumn.setName("Summation column " + id);
            summationColumn.setColumnType(types[random.nextInt(2)]);
            result.add(summationColumn);
        }

        return result;
    }

    private SummationColumnDayTypeRange fromDayType(DayType dayType) {
        var range = new SummationColumnDayTypeRange();
        range.setFrom(490);
        range.setTo(500);
        range.setDayTypeId(dayType.getId());
        return range;
    }
}
