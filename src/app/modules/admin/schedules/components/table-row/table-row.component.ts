import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { Employee } from '../../../../../model/employee';
import { ScheduleService } from '../../../../../services/schedule.service';
import { ScheduleGenerationService } from '../../../../../services/schedule-generation.service';
import { WorkDay } from '../../../../../model/workday';
import { ShiftPattern } from '../../../../../model/shift-pattern';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { PatternUnitService } from '../../../../../services/pattern-unit.service';
import { NotificationsService } from "angular2-notifications";
import { filter, switchMap } from "rxjs/operators";
import { selectingLeft, selectingRight } from "../../../../../shared/utils";
import { WorkingTime } from "../../../../../model/working-time";
import { CalendarDay } from "../../../../../model/ui/calendar-day";
import { PaginatorService } from "../../../../../shared/paginators/paginator.service";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() employee: Employee;
  @Input() patterns: ShiftPattern[];
  @Input() workingTime: WorkingTime[];

  @Input() mouseMove$: Observable<number>;

  // Context menu variables
  @ViewChild(ContextMenuComponent)
  public patternMenu: ContextMenuComponent;
  customHours: number;

  // Selection variables
  @ViewChildren(TableCellComponent)
  viewChildren: QueryList<TableCellComponent>;
  dragging = false;
  startX: number;

  // Table variables
  daysInMonth: CalendarDay[];
  schedule: WorkDay[];
  workingTimeSum = 0;
  workingTimeNorm = 0;
  workingHolidaysSum = 0;

  // Observable subscriptions
  private paginatorSub: Subscription;
  private mouseMoveSub: Subscription;
  private mouseDownSub: Subscription;
  private mouseUpSub:   Subscription;

  constructor(private elementRef: ElementRef,
              private scheduleService: ScheduleService,
              private scheduleGenerationService: ScheduleGenerationService,
              private patternUnitService: PatternUnitService,
              private paginatorService: PaginatorService,
              private contextMenuService: ContextMenuService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    // Because sometimes this component subscribes after values were emitted
    this.daysInMonth = this.paginatorService.getLastValue();

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
        }))
      .subscribe(schedule => {
        if (schedule) {
          this.schedule = schedule;
          this.calculateSum();
        }
      });
  }

  ngAfterViewInit(): void {
    this.mouseDownSub = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown')
      .subscribe(event => {
        this.dragging = true;
        this.startX = event.clientX;

        this.mouseMoveSub = this.mouseMove$
          .pipe(filter(() => this.dragging))
          .subscribe(clientX => {
            this.clearSelection();
            if (this.startX > clientX) {
              selectingLeft(this.startX, clientX, this.viewChildren);
            } else {
              selectingRight(this.startX, clientX, this.viewChildren);
            }
          });
      });

    this.mouseUpSub = fromEvent<MouseEvent>(document, 'mouseup')
      .subscribe(event => {
        if (this.dragging) {
          this.onContextMenu(event, this.selectedDays);
          this.dragging = false;
          if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
        }
      });
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
    console.log(this.paginatorSub);
    if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
    this.mouseDownSub.unsubscribe();
    this.mouseUpSub.unsubscribe();
  }

  getWorkDay(date: CalendarDay): WorkDay {
    if (this.schedule) {
      return this.schedule
        .find(workDay => workDay.date === date.isoString);
    } else {
      return null;
    }
  }

  getShiftNorm(shiftId: number): number {
    if (shiftId && this.workingTime) {
      const shiftWorkingTime = this.workingTime
        .find(value => {
          return (value.shiftId === shiftId)
        });
      return shiftWorkingTime ? shiftWorkingTime.hours : 0;
    } else {
      return 0;
    }
  }

  calculateSum(): void {
    this.calculateWorkingTimeSum();
    this.workingTimeNorm = this.getShiftNorm(this.employee.shiftId);
    this.calculateWorkingHolidaysSum();
  }

  calculateWorkingTimeSum(): void {
    if (this.schedule) {
      this.workingTimeSum = this.schedule
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0);
    }
  }

  calculateWorkingHolidaysSum(): void {
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
        this.selectedDays,
        this.customHours,
        this.scheduleGeneratedHandler);
  }

  generateSchedule(days: CalendarDay[],
                   patternId: number) {
    this.patternUnitService.getByPatternId(patternId)
      .subscribe(patternUnits =>
        this.scheduleGenerationService
          .generateScheduleByPatternId(
            this.employee.id,
            this.schedule,
            days,
            patternUnits,
            this.scheduleGeneratedHandler)
      );
  }

  private get scheduleGeneratedHandler(): any {
    return (createdSchedule, updatedSchedule) => {
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
  }

  private get selectedDays(): CalendarDay[] {
    return this.viewChildren
      .filter(item => item.selected)
      .map(value => value.day);
  }

  clearSelection() {
    this.viewChildren
      .filter(item => item.selected)
      .forEach(selectedItem => selectedItem.deselect());
  }
}
