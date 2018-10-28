import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { PatternService } from '../../../../../services/pattern.service';
import { Pattern } from '../../../../../model/pattern';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {

  departmentId = 1;
  employees: Employee[];
  patterns: Pattern[];

  constructor(private employeeService: EmployeeService,
              private patternService: PatternService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(this.departmentId)
      .subscribe(employees => this.employees = employees);
    this.patternService.getByDepartmentId(this.departmentId)
      .subscribe(patterns => this.patterns = patterns);
  }
}
