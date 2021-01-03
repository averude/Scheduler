package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.MainShiftComposition;
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

    public List<MainShiftComposition> generateShiftCompositionsList(LocalDate from,
                                                                    LocalDate to,
                                                                    int maxNumOfEmployeesInShift,
                                                                    boolean isSubstitution) {
        var shifts = shiftGenerator.generateShiftsList(4);
        var employees = employeeGenerator.generateEmployeesList(6);
        return generateShiftCompositionsList(from, to, shifts, employees, maxNumOfEmployeesInShift, isSubstitution);
    }

    public List<MainShiftComposition> generateShiftCompositionsList(LocalDate from,
                                                                    LocalDate to,
                                                                    List<Shift> shifts,
                                                                    List<Employee> employees,
                                                                    int maxNumOfEmployeesInShift,
                                                                    boolean isSubstitution) {
        var shiftCompositions = new ArrayList<MainShiftComposition>();

        shifts_loop:
        for (int shift_idx = 0, emp_idx = 0; shift_idx < shifts.size(); shift_idx++) {

            var shift = shifts.get(shift_idx);

            var loopLimit = emp_idx + random.nextInt(maxNumOfEmployeesInShift);
            for (; emp_idx < loopLimit; emp_idx++) {
                if (emp_idx >= employees.size()) break shifts_loop;

                var employee = employees.get(emp_idx);
                var shiftComposition = new MainShiftComposition();
                shiftComposition.setId((long) (shift_idx + emp_idx + 1));
                shiftComposition.setShiftId(shift.getId());
                shiftComposition.setEmployeeId(employee.getId());
                shiftComposition.setFrom(from);
                shiftComposition.setTo(to);
                shiftCompositions.add(shiftComposition);
            }
        }
        return shiftCompositions;
    }

    public MainShiftComposition getComposition(LocalDate compFrom,
                                               LocalDate compTo,
                                               boolean isSubstitution) {
        var composition = new MainShiftComposition();
        composition.setFrom(compFrom);
        composition.setTo(compTo);
        var employee = new Employee();
        employee.setId(1L);
        composition.setEmployeeId(employee.getId());
        return composition;
    }

    public MainShiftComposition getComposition(String dateFrom,
                                               String dateTo,
                                               boolean isSubstitution,
                                               long shiftId) {
        return getComposition(LocalDate.parse(dateFrom), LocalDate.parse(dateTo), isSubstitution, shiftId);
    }

    public MainShiftComposition getComposition(LocalDate from,
                                               LocalDate to,
                                               boolean isSubstitution,
                                               long shiftId) {
        MainShiftComposition composition = getComposition(from, to, isSubstitution);
        composition.setShiftId(shiftId);
        return composition;
    }
}
