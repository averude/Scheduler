package com.averude.uksatse.scheduler.generator.utils;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import org.junit.Test;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.junit.Assert.*;

public class ScheduleGenerationIntervalCreatorTest {

    @Test
    public void getIntervalsForSubstitutionComposition() {
        LocalDate compFrom = LocalDate.parse("2019-05-01");
        LocalDate compTo = LocalDate.parse("2019-09-30");

        var composition = new ShiftComposition();
        composition.setFrom(compFrom);
        composition.setTo(compTo);
        composition.setSubstitution(true);
        composition.setEmployeeId(1L);

        var creator = new ScheduleGenerationIntervalCreator();
        var from = LocalDate.parse("2019-03-01");
        var to = LocalDate.parse("2019-10-31");
        var offset = 0;
        var unitsSize = 4;

        var intervals = creator.getIntervalsForComposition(
                composition, null,
                from, to, offset, unitsSize);

        assertEquals(1, intervals.size());
        assertFalse(intervals.isEmpty());
        assertNotEquals(from, intervals.get(0).getFrom());
        assertEquals(compFrom, intervals.get(0).getFrom());
        assertEquals(compTo, intervals.get(0).getTo());
    }

    @Test
    public void getIntervalsForMainShiftComposition() {
        var mainShiftComposition = new ShiftComposition();
        mainShiftComposition.setFrom(LocalDate.parse("2019-01-01"));
        mainShiftComposition.setTo(LocalDate.parse("2019-12-31"));
        mainShiftComposition.setSubstitution(false);
        mainShiftComposition.setEmployeeId(1L);

        var substitutionCompositions = new ArrayList<ShiftComposition>();

        var subFrom = LocalDate.parse("2019-11-01");
        var subTo = LocalDate.parse("2019-11-15");

        var subComposition = new ShiftComposition();
        subComposition.setFrom(subFrom);
        subComposition.setTo(subTo);
        subComposition.setSubstitution(true);
        substitutionCompositions.add(subComposition);

        var creator = new ScheduleGenerationIntervalCreator();
        var from = LocalDate.parse("2019-01-01");
        var to = LocalDate.parse("2019-12-31");
        var offset = 0;
        var unitsSize = 4;

        var intervals = creator.getIntervalsForComposition(
                mainShiftComposition, substitutionCompositions,
                from, to, offset, unitsSize);

        System.out.println(intervals);

        assertEquals(2, intervals.size());
        assertEquals(subFrom.minusDays(1), intervals.get(0).getTo());
        assertEquals(subTo.plusDays(1), intervals.get(1).getFrom());
        assertFalse(intervals.isEmpty());
    }
}