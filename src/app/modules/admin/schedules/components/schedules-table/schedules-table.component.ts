import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../services/shiftpattern.service';
import { ShiftPattern } from '../../../../../model/shiftpattern';
import { fromEvent, Observable } from "rxjs";
import { distinctUntilChanged, filter, map, throttle, throttleTime } from "rxjs/operators";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {

  employees: Employee[];
  patterns: ShiftPattern[];

  mouseMove$: Observable<number> = fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      throttleTime(5),
      filter(event => event.buttons === 1),
      distinctUntilChanged((a, b) => a === b, event => event.clientX),
      map(event => event.clientX)
    );

  constructor(private employeeService: EmployeeService,
              private patternService: ShiftPatternService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees
        .sort((a, b) => a.shiftId - b.shiftId)); // temporary
    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);
  }
}
