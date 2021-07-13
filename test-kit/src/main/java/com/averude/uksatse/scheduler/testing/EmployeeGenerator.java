package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.model.entity.Employee;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class EmployeeGenerator {

    private Random random = new Random(42);
    private PositionGenerator positionGenerator;

    public EmployeeGenerator() {
        positionGenerator = new PositionGenerator();
    }

    public EmployeeGenerator(PositionGenerator positionGenerator) {
        this.positionGenerator = positionGenerator;
    }

    public List<Employee> generateEmployeesList(int numberOfEmployees) {
        var employees = new ArrayList<Employee>();
        for (int i = 0; i < numberOfEmployees; i++) {
            var id = (long)(i + 1);
            var employee = new Employee();
            employee.setId(id);
            employee.setFirstName("FirstName_" + id);
            employee.setSecondName("SecondName_" + id);
            employee.setPatronymic("Patronymic_" + id);
            employees.add(employee);
        }
        return employees;
    }
}

