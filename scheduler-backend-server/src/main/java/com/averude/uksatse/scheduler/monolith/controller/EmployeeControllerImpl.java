package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.EmployeeController;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.EmployeeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeControllerImpl
        extends AbstractCrudController<Employee> implements EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeControllerImpl(EmployeeService employeeService) {
        super(employeeService, LoggerFactory.getLogger(EmployeeController.class));
        this.employeeService = employeeService;
    }

    @Override
    public Iterable<Employee> getAllInPosition(Long positionId){
        return employeeService.findAllByPositionId(positionId);
    }

    @Override
    public List<Employee> getAllByDepartmentId(Long departmentId) {
        return employeeService.findAllByDepartmentId(departmentId);
    }

    @Override
    public List<Employee> getAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return employeeService.findAllByShiftIdAndDate(shiftId, from, to);
    }

    @Override
    public Iterable<Employee> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<Employee> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
