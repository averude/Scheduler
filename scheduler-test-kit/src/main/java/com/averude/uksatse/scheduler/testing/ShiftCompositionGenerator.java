package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ShiftCompositionGenerator {

    private Random random = new Random(42);

    private ShiftGenerator shiftGenerator;
    private EmployeeGenerator employeeGenerator;

    public ShiftCompositionGenerator() {
        shiftGenerator = new ShiftGenerator();
        employeeGenerator = new EmployeeGenerator();
    }

    public ShiftCompositionGenerator(ShiftGenerator shiftGenerator,
                                     EmployeeGenerator employeeGenerator) {
        this.shiftGenerator = shiftGenerator;
        this.employeeGenerator = employeeGenerator;
    }

    public List<ShiftComposition> generateShiftCompositionsList(LocalDate from,
                                                                LocalDate to,
                                                                int maxNumOfEmployeesInShift,
                                                                boolean isSubstitution) {
        var shifts = shiftGenerator.generateShiftsList(4);
        var employees = employeeGenerator.generateEmployeesList(6);
        return generateShiftCompositionsList(from, to, shifts, employees, maxNumOfEmployeesInShift, isSubstitution);
    }

    public List<ShiftComposition> generateShiftCompositionsList(LocalDate from,
                                                                LocalDate to,
                                                                List<Shift> shifts,
                                                                List<Employee> employees,
                                                                int maxNumOfEmployeesInShift,
                                                                boolean isSubstitution) {
        var shiftCompositions = new ArrayList<ShiftComposition>();

        shifts_loop:
        for (int shift_idx = 0, emp_idx = 0; shift_idx < shifts.size(); shift_idx++) {

            var shift = shifts.get(shift_idx);

            var loopLimit = emp_idx + random.nextInt(maxNumOfEmployeesInShift);
            for (; emp_idx < loopLimit; emp_idx++) {
                if (emp_idx >= employees.size()) break shifts_loop;

                var employee = employees.get(emp_idx);
                var shiftComposition = new ShiftComposition();
                shiftComposition.setId((long) (shift_idx + emp_idx + 1));
                shiftComposition.setSubstitution(isSubstitution);
                shiftComposition.setShiftId(shift.getId());
                shiftComposition.setEmployeeId(employee.getId());
                shiftComposition.setFrom(from);
                shiftComposition.setTo(to);
                shiftCompositions.add(shiftComposition);
            }
        }
        return shiftCompositions;
    }

    public ShiftComposition getComposition(LocalDate compFrom,
                                           LocalDate compTo,
                                           boolean isSubstitution) {
        var composition = new ShiftComposition();
        composition.setFrom(compFrom);
        composition.setTo(compTo);
        composition.setSubstitution(isSubstitution);
        composition.setEmployeeId(1L);
        return composition;
    }

    public ShiftComposition getComposition(String dateFrom,
                                           String dateTo,
                                           boolean isSubstitution,
                                           long shiftId) {
        return getComposition(LocalDate.parse(dateFrom), LocalDate.parse(dateTo), isSubstitution, shiftId);
    }

    public ShiftComposition getComposition(LocalDate from,
                                           LocalDate to,
                                           boolean isSubstitution,
                                           long shiftId) {
        ShiftComposition composition = getComposition(from, to, isSubstitution);
        composition.setShiftId(shiftId);
        return composition;
    }
}
