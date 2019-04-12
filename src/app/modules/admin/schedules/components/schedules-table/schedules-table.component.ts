import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../services/shiftpattern.service';
import { ShiftPattern } from '../../../../../model/shiftpattern';
import { PaginatorService } from "../../paginator.service";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {

  employees: Employee[];
  patterns: ShiftPattern[];

  constructor(private employeeService: EmployeeService,
              private patternService: ShiftPatternService,
              private paginatorService: PaginatorService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees);
        //.sort((a, b) => a.shiftId - b.shiftId)); // temporary
    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);
  }
}
