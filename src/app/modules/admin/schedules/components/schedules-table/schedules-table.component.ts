import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Employee } from '../../../../../model/employee';
import { EmployeeService } from '../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../services/shift-pattern.service';
import { ShiftPattern } from '../../../../../model/shift-pattern';
import { fromEvent, Observable, Subscription } from "rxjs";
import { distinctUntilChanged, filter, map, throttleTime } from "rxjs/operators";
import { WorkingTimeService } from "../../../../../services/working-time.service";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";
import { Shift } from "../../../../../model/shift";
import { WorkingTime } from "../../../../../model/working-time";
import { ShiftService } from "../../../../../services/shift.service";
import { TableShiftGroupComponent } from "../table-shift-group/table-shift-group.component";
import { DayType } from "../../../../../model/day-type";
import { DayTypeService } from "../../../../../services/day-type.service";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit, OnDestroy {

  shifts:       Shift[] = [];
  employees:    Employee[] = [];
  patterns:     ShiftPattern[];
  dayTypes:     DayType[];

  shiftsWorkingTime:  WorkingTime[] = [];

  @ViewChildren(TableShiftGroupComponent)
  groups: QueryList<TableShiftGroupComponent>;

  mouseMove$: Observable<number> = fromEvent<MouseEvent>(document, 'mousemove')
    .pipe(
      throttleTime(5),
      filter(event => event.buttons === 1),
      distinctUntilChanged((a, b) => a === b, event => event.clientX),
      map(event => event.clientX)
    );

  mouseUp$:   Observable<MouseEvent> = fromEvent<MouseEvent>(document, 'mouseup');

  sub: Subscription;

  constructor(private paginatorService: PaginatorService,
              private shiftService: ShiftService,
              private employeeService: EmployeeService,
              private patternService: ShiftPatternService,
              private dayTypesService: DayTypeService,
              private workingTimeService: WorkingTimeService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe(employees => this.employees = employees
        .sort((a, b) => a.shiftId - b.shiftId)); // temporary

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);

    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);

    this.dayTypesService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);

    this.sub = this.paginatorService.dates
      .pipe(
        filter(values => values.length > 0)
      ).subscribe(this.getWorkingTime);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.paginatorService.clearStoredValue();
  }

  getShiftEmployees(shiftId: number): Employee[] {
    return this.employees.filter(employee => employee.shiftId === shiftId);
  }

  getShiftWorkingTime(shiftId: number): WorkingTime {
    return this.shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
  }

  private getWorkingTime = (daysInMonth) => {
    this.workingTimeService.getAllByDate(
      daysInMonth[0].isoString,
      daysInMonth[daysInMonth.length - 1].isoString)
      .subscribe(workingTime => this.shiftsWorkingTime = workingTime);
  }
}
