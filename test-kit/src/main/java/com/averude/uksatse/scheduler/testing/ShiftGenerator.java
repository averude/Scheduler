package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class ShiftGenerator {

    private ShiftPatternGenerator shiftPatternGenerator;
    private Random random = new Random(42);

    public ShiftGenerator() {
        this.shiftPatternGenerator = new ShiftPatternGenerator();
    }

    public ShiftGenerator(ShiftPatternGenerator shiftPatternGenerator) {
        this.shiftPatternGenerator = shiftPatternGenerator;
    }

    public List<Shift> generateShiftsList(int numberOfShifts) {
        var shiftPattern = shiftPatternGenerator.generateShiftPattern();
        return generateShiftsList(numberOfShifts, shiftPattern);
    }

    public List<Shift> generateShiftsList(int numberOfShifts, ShiftPattern pattern) {
        return generateShifts(numberOfShifts, Collections.singletonList(pattern));
    }

    public List<Shift> generateShiftsList(int numberOfShifts, List<ShiftPattern> patterns) {
        return generateShifts(numberOfShifts, patterns);
    }

    private List<Shift> generateShifts(int numberOfShifts, List<ShiftPattern> patterns) {
        var shifts = new ArrayList<Shift>();

        int patternsSize = patterns.size();
        if (patterns == null || patternsSize == 0) {
            for(int i = 0; i < numberOfShifts; i++) {
                var id = generateId(i);
                var shift = createShift(id, null);
                shifts.add(shift);
            }
        } else if (patternsSize == 1) {
            for (int i = 0; i < numberOfShifts; i++) {
                var id = generateId(i);
                var shift = createShift(id, patterns.get(0));
                shifts.add(shift);
            }
        } else {
            for (int i = 0; i < numberOfShifts; i++) {
                var id = generateId(i);
                var shift = createShift(id, patterns.get(random.nextInt(patternsSize)));
                shifts.add(shift);
            }
        }

        return shifts;
    }

    public Shift createShift(long id, ShiftPattern pattern) {
        var shift = new Shift();
        shift.setId(id);
        shift.setShiftPatternId(pattern.getId());
        shift.setName("Shift_" + id);
        return shift;
    }

    private long generateId(int i) {
        return (long) (i + 1);
    }
}
