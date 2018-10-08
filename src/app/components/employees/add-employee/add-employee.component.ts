import { Component, Input, OnInit } from '@angular/core';
import { Position } from '../../../model/position';
import { Employee } from '../../../model/employee';
import { Shift } from '../../../model/shift';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: '[app-add-employee]',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input()
  positions: Position[];
  @Input()
  shifts: Shift[];
  newEmployee: Employee = new Employee();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {}

  addEmployee() {
    this.employeeService.create(this.newEmployee);
    this.clearModel();
  }

  clearModel() {
    this.newEmployee = new Employee();
  }
}
