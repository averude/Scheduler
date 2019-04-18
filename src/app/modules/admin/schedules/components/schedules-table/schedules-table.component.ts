import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../services/shift-pattern.service';
import { ShiftPattern } from '../../../../../model/shift-pattern';
import { fromEvent, Observable, Subscription } from "rxjs";
import { distinctUntilChanged, filter, map, throttleTime } from "rxjs/operators";
import { WorkingTime } from "../../../../../model/working-time";
import { WorkingTimeService } from "../../../../../services/working-time.service";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit, OnDestroy, AfterViewInit {

  employees: Employee[];
  patterns: ShiftPattern[];
  workingTime: WorkingTime[];

  mouseMove$: Observable<number> = fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      throttleTime(5),
      filter(event => event.buttons === 1),
      distinctUntilChanged((a, b) => a === b, event => event.clientX),
      map(event => event.clientX)
    );

  private sub: Subscription;

  constructor(private paginatorService: PaginatorService,
              private employeeService: EmployeeService,
              private patternService: ShiftPatternService,
              private workingTimeService: WorkingTimeService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees
        .sort((a, b) => a.shiftId - b.shiftId)); // temporary
    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);
  }

  ngAfterViewInit(): void {
    this.sub = this.paginatorService.dates
      .pipe(filter(value => value.length > 0))
      .subscribe(daysInMonth => {
        this.workingTimeService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString
        ).subscribe(workingTime => this.workingTime = workingTime);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
