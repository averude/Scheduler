import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { Employee } from '../../../../../../../model/employee';
import { Position } from '../../../../../../../model/position';
import { ScheduleService } from '../../../../../../../services/schedule.service';
import { ScheduleGenerationService } from '../../../../../../../services/schedule-generation.service';
import { WorkDay } from '../../../../../../../model/workday';
import { ShiftPattern } from '../../../../../../../model/shift-pattern';
import { Observable, Subscription } from 'rxjs';
import { PatternUnitService } from '../../../../../../../services/pattern-unit.service';
import { NotificationsService } from "angular2-notifications";
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../../../model/day-type";
import { SelectableRowDirective } from "../../../../../../../shared/directives/selectable-row.directive";
import { roundToTwo } from "../../../../../../../shared/utils/utils";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { TableCellComponent } from "../table-cell/table-cell.component";
import { ShowHoursService } from "../show-hours-control/show-hours.service";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements OnInit, OnChanges, OnDestroy {

  @Input() employee:      Employee;
  @Input() position:      Position;
  @Input() patterns:      ShiftPattern[];
  @Input() dayTypes:      DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];
  @Input() schedule:      WorkDay[];

  @Input() mouseMove$:    Observable<number>;
  @Input() mouseUp$:      Observable<MouseEvent>;

  @Input() workingTimeNorm: number;

  // Context menu variables
  @ViewChild(ContextMenuComponent)
  public patternMenu: ContextMenuComponent;
  customHours: number;
  offset = 0;

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  // Selection variables
  @ViewChildren(TableCellComponent)
  cells: QueryList<TableCellComponent>;

  // Table variables
  daysInMonth:  CalendarDay[];
  workingTimeSum = 0;
  workingHolidaysSum = 0;

  // Observable subscriptions
  private paginatorSub: Subscription;

  constructor(public elementRef: ElementRef,
              private cd: ChangeDetectorRef,
              private scheduleService: ScheduleService,
              private scheduleGenerationService: ScheduleGenerationService,
              private patternUnitService: PatternUnitService,
              private paginatorService: PaginatorService,
              private showHoursService: ShowHoursService,
              private contextMenuService: ContextMenuService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.paginatorSub = this.paginatorService.dates
      .subscribe(daysInMonth => {
        this.daysInMonth = daysInMonth;
        this.cd.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schedule']) {
      this.calculateSum();
      this.cd.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  calculateSum(): void {
    this.calculateWorkingTimeSum();
    this.calculateWorkingHolidaysSum();
  }

  getWorkingDay(date: string): WorkDay {
    return this.schedule ? this.schedule.find(value => value.date === date) : null;
  }

  private calculateWorkingTimeSum(): void {
    if (this.schedule) {
      this.workingTimeSum = roundToTwo(this.schedule
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0));
    }
  }

  private calculateWorkingHolidaysSum(): void {
    if (this.schedule) {
      this.workingHolidaysSum = roundToTwo(this.schedule
        .filter(workDay => workDay.holiday)
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0));
    }
  }

  onContextMenu($event: MouseEvent, days: CalendarDay[]): void {
    if (days.length > 0) {
      setTimeout(() => {
        this.contextMenuService.show.next({
          contextMenu: this.patternMenu,
          event: $event,
          item: days,
        });
        $event.preventDefault();
        $event.stopPropagation();
      });
    }
  }

  generateScheduleWithCustomHours() {
    this.scheduleGenerationService
      .generateScheduleWithCustomHours(
        this.employee.id,
        this.selectableRowDirective.selectedCells,
        this.customHours,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  generateSchedule(pattern: ShiftPattern) {
    const selectedCells = this.selectableRowDirective.selectedCells;

    this.patternUnitService.getByPatternId(pattern.id)
      .subscribe(patternUnits => {
        this.scheduleGenerationService
          .generateScheduleWithPattern(
            this.employee.id,
            selectedCells,
            patternUnits,
            this.offset,
            pattern.overrideExistingValues,
            this.scheduleGeneratedHandler,
            this.errorHandler)
      });
  }

  generateScheduleBySingleDay(dayType: DayType) {
    this.scheduleGenerationService
      .generateScheduleBySingleDay(
        this.employee.id,
        this.selectableRowDirective.selectedCells,
        this.customHours,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  private scheduleGeneratedHandler = (cells) => {
    const createdSchedule = cells
      .filter(cell => !cell.workDay.id)
      .map(cell => cell.workDay);

    let updatedCells = cells
      .filter(cell => cell.workDay.id);
    const updatedSchedule = updatedCells
      .map(cell => cell.workDay);

    if (createdSchedule.length > 0) {
        this.scheduleService.create(createdSchedule)
          .subscribe(res => {
            res.forEach(workDay => this.schedule.push(workDay));
            this.calculateSum();
            this.cd.markForCheck();
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          });
      }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(updatedSchedule)
          .subscribe(res => {
            updatedCells.forEach(cell => {
              cell.setLabel();
              cell.cd.markForCheck();
            });
            this.calculateSum();
            this.cd.markForCheck();
            this.notificationService.success(
                'Updated',
                'Schedule sent successfully');
          });
      }
  };

  private errorHandler = message => this.notificationService.error('Error', message);

  clearSelection() {
    this.selectableRowDirective.clearSelection();
  }
}
