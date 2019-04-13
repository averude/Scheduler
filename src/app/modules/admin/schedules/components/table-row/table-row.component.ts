import {
  Component, ViewChildren, Input, OnInit, QueryList,
  ViewChild, OnDestroy, AfterViewInit, ElementRef
} from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { Employee } from '../../../../../model/employee';
import { ScheduleService } from '../../../../../services/schedule.service';
import { ScheduleGenerationService } from '../../../../../services/schedule-generation.service';
import { WorkDay } from '../../../../../model/workday';
import { ShiftPattern } from '../../../../../model/shiftpattern';
import { PaginatorService } from '../../paginator.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { PatternUnitService } from '../../../../../services/pattern-unit.service';
import { NotificationsService } from "angular2-notifications";
import { filter, switchMap } from "rxjs/operators";
import { dateToISOString, selectingLeft, selectingRight } from "../../../../../shared/utils";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() departmentId: number;
  @Input() employee: Employee;
  @Input() patterns: ShiftPattern[];

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
  daysInMonth: Date[];
  schedule: WorkDay[];
  sum = 0;

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
    this.paginatorSub = this.paginatorService.dates
      .pipe(switchMap(daysInMonth => {
          this.daysInMonth = daysInMonth;
          return this.scheduleService.getByDate(
            daysInMonth[0],
            daysInMonth[daysInMonth.length - 1],
            this.employee.id
          );
        }))
      .subscribe(schedule => {
        this.schedule = schedule;
        this.calculateSum();
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
            console.log(clientX);
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
          this.onContextMenu(event, this.selectedDates);
          this.dragging = false;
          if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
        }
      });
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
    if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
    this.mouseDownSub.unsubscribe();
    this.mouseUpSub.unsubscribe();
  }

  getWorkDay(date: Date): WorkDay {
    if (this.schedule) {
      return this.schedule
        .find(workDay => workDay.date === dateToISOString(date));
    } else {
      return null;
    }
  }

  calculateSum(): void {
    if (this.schedule) {
      this.sum = this.schedule
        .map(workDay => workDay.hours)
        .reduce((prev, curr) => prev + curr, 0);
    }
  }

  isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  onContextMenu($event: MouseEvent, dates: Date[]): void {
    if (dates.length > 0) {
      setTimeout(() => {
        this.contextMenuService.show.next({
          contextMenu: this.patternMenu,
          event: $event,
          item: dates,
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
        this.selectedDates,
        this.customHours,
        this.scheduleGeneratedHandler);
  }

  generateSchedule(dates: Date[],
                   patternId: number) {
    this.patternUnitService.getByPatternId(patternId)
      .subscribe(patternUnits =>
        this.scheduleGenerationService
          .generateScheduleByPatternId(
            this.employee.id,
            this.schedule,
            dates,
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

  private get selectedDates(): Date[] {
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
