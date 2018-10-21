import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(1)
      .subscribe(value => this.employees = value);
  }
}
