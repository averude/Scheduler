package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.core.model.entity.SummationColumnType.COUNT;
import static com.averude.uksatse.scheduler.core.model.entity.SummationColumnType.HOURS_SUM;

public class SummationColumnGenerator {

    private Random random = new Random(42);
    private String[] types = new String[]{COUNT, HOURS_SUM};

    public SummationColumn createSummationColumn(SummationColumnDayTypeRange range,
                                                 String columnType) {
        var summationColumn = new SummationColumn();
        summationColumn.setId(1L);
        summationColumn.setName("Summation column " + summationColumn.getId());
        summationColumn.setColumnType(columnType);
        summationColumn.setDayTypeRanges(range == null ? null : List.of(range));
        return summationColumn;
    }

    public List<SummationColumnDayTypeRange> generateRanges(List<DayType> dayTypes) {
        return dayTypes.stream()
                .map(this::createRange)
                .collect(Collectors.toList());
    }

    public List<SummationColumnDayTypeRange> generateRanges(List<DayType> dayTypes,
                                                            Integer from,
                                                            Integer to) {
        return dayTypes.stream()
                .map(dayType -> createRange(dayType, from, to))
                .collect(Collectors.toList());
    }

    public List<SummationColumn> getRandomSummationColumns(List<DayType> dayTypes) {
        var ranges = generateRanges(dayTypes);
        return createRandomSummationColumns(ranges);
    }

    public List<SummationColumn> createRandomSummationColumns(List<SummationColumnDayTypeRange> ranges) {
        var result = new ArrayList<SummationColumn>();

        for (int i = 0; i < ranges.size(); i++) {
            var summationColumn = new SummationColumn();
            long id = i + 1;
            summationColumn.setId(id);
            summationColumn.setDayTypeRanges(Collections.singletonList(ranges.get(i)));
            summationColumn.setEnterpriseId(1L);
            summationColumn.setName("Summation column " + id);
            summationColumn.setColumnType(types[random.nextInt(2)]);
            result.add(summationColumn);
        }

        return result;
    }

    public SummationColumnDayTypeRange createRange(DayType dayType) {
        return createRange(dayType.getId());
    }

    public SummationColumnDayTypeRange createRange(Long dayTypeId) {
        return createRange(dayTypeId, 490, 500);
    }

    public SummationColumnDayTypeRange createRange(DayType dayType,
                                                   Integer from,
                                                   Integer to) {
        return createRange(dayType.getId(), from, to);
    }

    public SummationColumnDayTypeRange createRange(Long dayTypeId,
                                                   Integer from,
                                                   Integer to) {
        var range = new SummationColumnDayTypeRange();
        range.setFrom(from);
        range.setTo(to);
        range.setDayTypeId(dayTypeId);
        return range;
    }
}
