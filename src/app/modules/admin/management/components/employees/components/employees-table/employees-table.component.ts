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

  departmentId = 1;
  // Data
  employees:  Employee[];
  positions:  Position[];
  shifts:     Shift[];

  constructor(private notificationService: NotificationsService,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              private shiftService: ShiftService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(this.departmentId)
      .subscribe(employees => this.employees = employees);
    this.positionService.getByDepartmentId(this.departmentId)
      .subscribe(positions => this.positions = positions);
    this.shiftService.getByDepartmentId(this.departmentId)
      .subscribe(shifts => this.shifts = shifts);
  }

  addEmployee(employee: Employee) {
    this.employeeService.create(this.departmentId, employee.positionId, employee)
      .subscribe(res => {
        employee.id = res;
        this.employees.push(employee);
        this.notificationService.success(
          'Created',
          this.getSuccessMessage(employee, 'created')
        )
      });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.update(this.departmentId, employee.positionId, employee.id, employee)
      .subscribe(res => this.notificationService.success(
          'Updated',
          this.getSuccessMessage(employee, 'updated')
        ));
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.remove(this.departmentId, employee.positionId, employee.id)
      .subscribe(res =>
        this.employees = this.employees
          .filter(value => value !== employee));
  }

  getSuccessMessage(employee: Employee, action: string): string {
    return `Employee ${employee.secondName} ${employee.firstName} was ${action} with ID:${employee.id}`
  }
}
