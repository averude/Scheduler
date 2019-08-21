import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../../../model/employee';
import { EmployeeService } from '../../../../../../../services/employee.service';
import { Position } from '../../../../../../../model/position';
import { PositionService } from '../../../../../../../services/position.service';
import { Shift } from '../../../../../../../model/shift';
import { ShiftService } from '../../../../../../../services/shift.service';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-employees',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {

  // Data
  employees:  Employee[];
  positions:  Position[];
  shifts:     Shift[];

  constructor(private notificationService: NotificationsService,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              private shiftService: ShiftService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);
    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);
    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  addEmployee(employee: Employee) {
    this.employeeService.create(employee)
      .subscribe(res => {
        employee.id = res;
        this.employees.push(employee);
        this.notificationService.success(
          'Created',
          `Employee "${employee.secondName} ${employee.firstName}" was successfully created`
        );
      });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.update(employee)
      .subscribe(res => this.notificationService.success(
          'Updated',
        `Employee "${employee.secondName} ${employee.firstName}" was successfully updated`
        ));
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.remove(employee.id)
      .subscribe(res => {
        this.employees = this.employees
            .filter(value => value !== employee);
        this.notificationService.success(
          'Deleted',
          `Employee "${employee.secondName} ${employee.firstName}" was successfully deleted`
        );
      });
  }
}
