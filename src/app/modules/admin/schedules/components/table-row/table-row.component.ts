import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { Employee } from '../../../../../model/employee';
import { ScheduleService } from '../../../../../services/schedule.service';
import { ScheduleGenerationService } from '../../../../../services/schedule-generation.service';
import { WorkDay } from '../../../../../model/workday';
import { ShiftPattern } from '../../../../../model/shift-pattern';
import { Observable, Subscription } from 'rxjs';
import { PatternUnitService } from '../../../../../services/pattern-unit.service';
import { NotificationsService } from "angular2-notifications";
import { filter, switchMap } from "rxjs/operators";
import { CalendarDay } from "../../../../../model/ui/calendar-day";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../model/day-type";
import { SelectableRowDirective } from "../../../../../shared/directives/selectable-row.directive";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit, OnDestroy {

  @Input() employee:    Employee;
  @Input() patterns:    ShiftPattern[];
  @Input() dayTypes:    DayType[];

  @Input() mouseMove$:  Observable<number>;
  @Input() mouseUp$:    Observable<MouseEvent>;

  @Input() workingTimeNorm: number;

  // Context menu variables
  @ViewChild(ContextMenuComponent)
  public patternMenu: ContextMenuComponent;
  customHours: number;
  offset = 0;

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  // Table variables
  daysInMonth:  CalendarDay[];
  schedule:     WorkDay[];
  workingTimeSum = 0;
  workingHolidaysSum = 0;

  // Observable subscriptions
  private paginatorSub: Subscription;

  constructor(public elementRef: ElementRef,
              private scheduleService: ScheduleService,
              private scheduleGenerationService: ScheduleGenerationService,
              private patternUnitService: PatternUnitService,
              private paginatorService: PaginatorService,
              private contextMenuService: ContextMenuService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.paginatorSub = this.paginatorService.dates
      .pipe(
        filter(daysInMonth => daysInMonth.length > 0),
        switchMap(daysInMonth => {
          this.daysInMonth = daysInMonth;
          return this.scheduleService.getByDate(
            daysInMonth[0].isoString,
            daysInMonth[daysInMonth.length - 1].isoString,
            this.employee.id
          );
        }),
        filter(schedule => !!schedule))
      .subscribe(schedule => {
        this.schedule = schedule;
        this.calculateSum();
      });
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  getWorkDay(date: CalendarDay): WorkDay {
    if (this.schedule) {
      return this.schedule
        .find(workDay => workDay.date === date.isoString);
    } else {
      return null;
    }
  }

  calculateSum(): void {
    this.calculateWorkingTimeSum();
    this.calculateWorkingHolidaysSum();
  }

  private calculateWorkingTimeSum(): void {
    if (this.schedule) {
      this.workingTimeSum = this.schedule
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0);
    }
  }

  private calculateWorkingHolidaysSum(): void {
    if (this.schedule) {
      this.workingHolidaysSum = this.schedule
        .filter(workDay => workDay.holiday)
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0);
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
        this.schedule,
        this.selectableRowDirective.selectedDays,
        this.customHours,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  generateSchedule(days: CalendarDay[],
                   pattern: ShiftPattern) {
    this.patternUnitService.getByPatternId(pattern.id)
      .subscribe(patternUnits => {
        this.scheduleGenerationService
          .generateScheduleWithPattern(
            this.employee.id,
            this.schedule,
            days,
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
        this.schedule,
        this.selectableRowDirective.selectedDays,
        this.customHours,
        dayType,
        this.scheduleGeneratedHandler,
        this.errorHandler);
  }

  private scheduleGeneratedHandler = (createdSchedule, updatedSchedule) => {
      if (createdSchedule.length > 0) {
        this.scheduleService.create(
          this.employee.id,
          createdSchedule
        ).subscribe(res => {
              res.forEach(workDay => this.schedule.push(workDay));
              this.calculateSum();
              this.notificationService.success(
                'Created',
                'Schedule sent successfully');
            });
        }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(
          this.employee.id,
          updatedSchedule
        ).subscribe(res => {
              this.calculateSum();
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
