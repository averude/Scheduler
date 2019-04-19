import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../services/shift-pattern.service';
import { ShiftPattern } from '../../../../../model/shift-pattern';
import { fromEvent, Observable, Subscription } from "rxjs";
import { distinctUntilChanged, filter, map, throttleTime } from "rxjs/operators";
import { WorkingTimeService } from "../../../../../services/working-time.service";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";
import { TableRowComponent } from "../table-row/table-row.component";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit, OnDestroy {

  employees:    Employee[];
  patterns:     ShiftPattern[];

  mouseMove$: Observable<number> = fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      throttleTime(5),
      filter(event => event.buttons === 1),
      distinctUntilChanged((a, b) => a === b, event => event.clientX),
      map(event => event.clientX)
    );

  mouseUp$:   Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'mouseup');

  sub: Subscription;

  @ViewChildren(TableRowComponent)
  rows: QueryList<TableRowComponent>;

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

    this.sub = this.paginatorService.dates
      .pipe(
        filter(values => values.length > 0)
      ).subscribe(this.getWorkingTime);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.paginatorService.clearStoredValue();
  }

  private getWorkingTime = (daysInMonth) => {
    this.workingTimeService.getAllByDate(
      daysInMonth[0].isoString,
      daysInMonth[daysInMonth.length - 1].isoString)
      .subscribe(workingTime =>
        this.rows.forEach(row => {
          let workingTimeNorm = workingTime
            .find(val => val.shiftId === row.employee.shiftId);
          row.workingTimeNorm = workingTimeNorm ? workingTimeNorm.hours : 0;
        }));
  }
}
