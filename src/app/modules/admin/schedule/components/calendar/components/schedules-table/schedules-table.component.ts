import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Employee } from '../../../../../../../model/employee';
import { EmployeeService } from '../../../../../../../services/employee.service';
import { ShiftPatternService } from '../../../../../../../services/shift-pattern.service';
import { ShiftPattern } from '../../../../../../../model/shift-pattern';
import { fromEvent, Observable, Subscription } from "rxjs";
import { distinctUntilChanged, filter, map, throttleTime } from "rxjs/operators";
import { WorkingTimeService } from "../../../../../../../services/working-time.service";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { Shift } from "../../../../../../../model/shift";
import { Position } from "../../../../../../../model/position";
import { WorkingTime } from "../../../../../../../model/working-time";
import { ShiftService } from "../../../../../../../services/shift.service";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeService } from "../../../../../../../services/day-type.service";
import { PositionService } from "../../../../../../../services/position.service";
import { DayTypeGroupService } from "../../../../../../../services/day-type-group.service";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { ScheduleService } from "../../../../../../../services/schedule.service";
import { ScheduleDto } from "../../../../../../../model/dto/schedule-dto";
import { ScheduleGenerationService } from "../../../../../../../services/schedule-generation.service";
import { PatternUnitService } from "../../../../../../../services/pattern-unit.service";
import { ContextMenuData } from "../../../../../../../model/ui/context-menu-data";
import { ContextMenuComponent } from "ngx-contextmenu";
import { TableShiftGroupComponent } from "../table-shift-group/table-shift-group.component";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit, OnDestroy {

  @ViewChild(ContextMenuComponent)
  patternMenu:  ContextMenuComponent;
  customHours:  number;
  offset:       number;

  @ViewChildren(TableShiftGroupComponent)
  shiftGroups: QueryList<TableShiftGroupComponent>;

  shifts:             Shift[]         = [];
  schedule:           ScheduleDto[]   = [];
  positions:          Position[]      = [];
  patterns:           ShiftPattern[]  = [];
  dayTypes:           DayType[]       = [];
  dayTypeGroups:      DayTypeGroup[]  = [];
  shiftsWorkingTime:  WorkingTime[]   = [];

  employeesMap:       Map<number, Employee[]>   = new Map<number, Employee[]>();

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
              private scheduleService: ScheduleService,
              private positionService: PositionService,
              private patternService: ShiftPatternService,
              private patternUnitService: PatternUnitService,
              private dayTypesService: DayTypeService,
              private dayTypeGroupService: DayTypeGroupService,
              private workingTimeService: WorkingTimeService,
              private scheduleGenerationService: ScheduleGenerationService) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.paginatorService.clearStoredValue();
  }

  getShiftEmployees(shiftId: number): Employee[] {
    return this.employeesMap.get(shiftId);
  }

  getShiftWorkingTime(shiftId: number): WorkingTime {
    return this.shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
  }

  getDayTypesWithDefaultHours(): DayType[] {
    return this.dayTypes.filter(dayType => dayType.defaultValue !== null);
  }

  getPatternsWithOverrideExistingValues(): ShiftPattern[] {
    return this.patterns.filter(pattern => pattern.overrideExistingValues);
  }

  getPatternsWithoutOverrideExistingValues(): ShiftPattern[] {
    return this.patterns.filter(pattern => !pattern.overrideExistingValues);
  }

  private getData() {
    this.employeeService.getAll()
      .subscribe(employees => {
        employees.map(employee => employee.shiftId)
          .forEach(shiftId =>
            this.employeesMap.set(shiftId, employees.filter(value => value.shiftId === shiftId)))
      });

    this.positionService.getAll()
      .subscribe(positions => this.positions = positions);

    this.shiftService.getAll()
      .subscribe(shifts => this.shifts = shifts);

    this.patternService.getAll()
      .subscribe(patterns => this.patterns = patterns);

    this.dayTypesService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);

    this.dayTypeGroupService.getAll()
      .subscribe(dayTypeGroups => this.dayTypeGroups = dayTypeGroups);

    this.sub = this.paginatorService.dates
      .pipe(
        filter(values => values.length > 0)
      ).subscribe((daysInMonth) => {
        this.workingTimeService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString)
          .subscribe(workingTime => this.shiftsWorkingTime = workingTime);

        this.scheduleService.getAllByDate(
          daysInMonth[0].isoString,
          daysInMonth[daysInMonth.length - 1].isoString)
          .subscribe(schedule => this.schedule = schedule);
      });
  }

  generateScheduleByCustomDay(dayType: DayType,
                              data: ContextMenuData) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        data.employeeId,
        data.selectedCells,
        this.customHours,
        dayType,
        data.generatedHandler,
        data.errorHandler);
  }

  generateSchedule(pattern: ShiftPattern,
                   data: ContextMenuData) {
    this.patternUnitService.getByPatternId(pattern.id)
      .subscribe(patternUnits => {
        this.scheduleGenerationService
          .generateScheduleWithPattern(
            data.employeeId,
            data.selectedCells,
            patternUnits,
            this.offset,
            pattern.overrideExistingValues,
            data.generatedHandler,
            data.errorHandler)
      });
  }

  generateScheduleBySingleDay(dayType: DayType,
                              data: ContextMenuData) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        data.employeeId,
        data.selectedCells,
        dayType.defaultValue,
        dayType,
        data.generatedHandler,
        data.errorHandler);
  }

  clearSelection() {
    this.shiftGroups
      .forEach(group => group.rows
        .forEach(row => row.clearSelection()));
  }
}
