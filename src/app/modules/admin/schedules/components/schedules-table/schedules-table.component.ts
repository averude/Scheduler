import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../services/shiftpattern.service';
import { ShiftPattern } from '../../../../../model/shiftpattern';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {

  departmentId = 1;
  employees: Employee[];
  patterns: ShiftPattern[];

  constructor(private employeeService: EmployeeService,
              private patternService: ShiftPatternService) { }

  ngOnInit() {
    this.employeeService.getByDepartmentId(this.departmentId)
      .subscribe(employees => this.employees = employees);
    this.patternService.getByDepartmentId(this.departmentId)
      .subscribe(patterns => this.patterns = patterns);
  }
}
