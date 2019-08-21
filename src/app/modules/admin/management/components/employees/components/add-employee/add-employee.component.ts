import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Position } from '../../../../../../../model/position';
import { Employee } from '../../../../../../../model/employee';
import { Shift } from '../../../../../../../model/shift';

@Component({
  selector: '[app-add-employee]',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() positions: Position[];
  @Input() shifts:    Shift[];
  newEmployee: Employee = new Employee();
  @Output()
  employeeCreated: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor() { }

  ngOnInit() {}

  addEmployee() {
    this.employeeCreated.emit(this.newEmployee);
    this.clearModel();
  }

  clearModel() {
    this.newEmployee = new Employee();
  }
}
