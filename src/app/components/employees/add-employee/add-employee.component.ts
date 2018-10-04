import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Position} from '../../../model/position';
import {Employee} from '../../../model/employee';
import {Shift} from '../../../model/shift';

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
  model: Employee = new Employee();

  @Output()
  newEmployee: EventEmitter<Employee> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  addEmployee() {
    this.newEmployee.emit(this.model);
    this.clearModel();
  }

  clearModel() {
    this.model = new Employee();
  }

}
