import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, } from '@angular/core';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { Employee } from '../../../../../../../model/employee';
import { Position } from '../../../../../../../model/position';
import { ScheduleService } from '../../../../../../../services/schedule.service';
import { WorkDay } from '../../../../../../../model/workday';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from "angular2-notifications";
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../../../model/day-type";
import { SelectableRowDirective } from "../../../../../../../shared/directives/selectable-row.directive";
import { roundToTwo } from "../../../../../../../shared/utils/utils";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { TableCellComponent } from "../table-cell/table-cell.component";
import { ShowHoursService } from "../show-hours-control/show-hours.service";
import { ContextMenuData } from "../../../../../../../model/ui/context-menu-data";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit, OnChanges, OnDestroy {

  @Input() employee:      Employee;
  @Input() position:      Position;
  @Input() dayTypes:      DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];
  @Input() schedule:      WorkDay[];
  @Input() mouseMove$:    Observable<number>;
  @Input() mouseUp$:      Observable<MouseEvent>;
  @Input() patternMenu:   ContextMenuComponent;

  @Input() workingTimeNorm: number;

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  // Table variables
  daysInMonth:  CalendarDay[];
  workingTimeSum = 0;
  workingHolidaysSum = 0;

  // Observable subscriptions
  private paginatorSub: Subscription;

  constructor(public elementRef: ElementRef,
              private scheduleService: ScheduleService,
              private paginatorService: PaginatorService,
              private showHoursService: ShowHoursService,
              private contextMenuService: ContextMenuService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.paginatorSub = this.paginatorService.dates
      .subscribe(daysInMonth => {
        this.daysInMonth = daysInMonth;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schedule']) {
      this.calculateSum();
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

  onContextMenu($event: MouseEvent,
                selectedCells: TableCellComponent[]): void {
    if (selectedCells && selectedCells.length > 0) {
      const data: ContextMenuData = {
        employeeId: this.employee.id,
        selectedCells: selectedCells,
        generatedHandler: this.scheduleGeneratedHandler,
        errorHandler: this.errorHandler
      };

      setTimeout(() => {
        this.contextMenuService.show.next({
          contextMenu: this.patternMenu,
          event: $event,
          item: data,
        });
        $event.preventDefault();
        $event.stopPropagation();
      });
    }
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
            this.notificationService.success(
              'Created',
              'Schedule sent successfully');
          }, err => cells.forEach(cell => cell.revertChanges()));
    }
    if (updatedSchedule.length > 0) {
      this.scheduleService.update(updatedSchedule)
        .subscribe(res => {
            updatedCells.forEach(cell => {
              cell.refreshLabel();
            });
            this.calculateSum();
            this.notificationService.success(
                'Updated',
                'Schedule sent successfully');
          }, err => cells.forEach(cell => cell.revertChanges()));
      }
  };

  private errorHandler = (message) => this.notificationService.error('Error', message);

  clearSelection() {
    this.selectableRowDirective.clearSelection();
  }
}
