import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {EmployeeService} from '../../services/employee.service';
import {Position} from '../../model/position';
import {PositionService} from '../../services/position.service';
import {Shift} from '../../model/shift';
import {ShiftService} from '../../services/shift.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  departmentId = 1;
  // Data
  employees:  Employee[];
  positions:  Position[];
  shifts:     Shift[];

  constructor(private employeeService: EmployeeService,
              private positionService: PositionService,
              private shiftService: ShiftService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(this.departmentId)
      .subscribe(employees => this.employees = employees);
    this.positionService.getByDepartmentId(this.departmentId)
      .subscribe(positions => this.positions = positions);
    this.shiftService.findAll()
      .subscribe(shifts => this.shifts = shifts);
  }

  addEmployee(employee: Employee) {
    this.employeeService.create(this.departmentId, employee.positionId, employee)
      .subscribe(res => {
        employee.id = res;
        this.employees.push(employee);
      }, err => console.log(err));
  }

  updateEmployee(employee: Employee) {
    this.employeeService.update(this.departmentId, employee.positionId, employee.id, employee)
      .subscribe(res => console.log(res),
          err => console.log(err));
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.remove(this.departmentId, employee.positionId, employee.id)
      .subscribe(res =>
        this.employees = this.employees
          .filter(value => value !== employee),
          err => console.log(err));
  }
}
