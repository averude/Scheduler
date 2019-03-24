import {
  Component,
  ViewChildren,
  Input,
  OnInit,
  QueryList,
  HostListener,
  ViewChild, OnDestroy
} from '@angular/core';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { Employee } from '../../../../../model/employee';
import { ScheduleService } from '../../../../../services/schedule.service';
import { ScheduleGenerationService } from '../../../../../services/schedule-generation.service';
import { WorkDay } from '../../../../../model/workday';
import { ShiftPattern } from '../../../../../model/shiftpattern';
import { PaginatorService } from '../../paginator.service';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators';
import { PatternUnitService } from '../../../../../services/pattern-unit.service';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit, OnDestroy {

  @Input() departmentId: number;
  @Input() employee: Employee;
  @Input() patterns: ShiftPattern[];

  // Context menu variables
  @ViewChild(ContextMenuComponent)
  public patternMenu: ContextMenuComponent;
  customHours: number;

  // Selection variables
  @ViewChildren(TableCellComponent)
  viewChildren: QueryList<TableCellComponent>;
  dragging = false;

  // Table variables
  daysInMonth: Date[];
  schedule: WorkDay[];
  sum = 0;

  // Observable subscriptions
  private paginatorSub: Subscription;

  constructor(private scheduleService: ScheduleService,
              private scheduleGenerationService: ScheduleGenerationService,
              private patternUnitService: PatternUnitService,
              private paginatorService: PaginatorService,
              private contextMenuService: ContextMenuService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.paginatorSub = this.paginatorService.dates
      .pipe(mergeMap(daysInMonth => {
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

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  getWorkDay(date: Date): WorkDay {
    if (this.schedule) {
      const dateISO = date.toISOString().split('T')[0];
      return this.schedule
        .find(workDay => workDay.date === dateISO);
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

  @HostListener('mousedown')
  mouseDown() {
    this.dragging = true;
  }

  @HostListener('mouseup', ['$event'])
  mouseUp($event: MouseEvent) {
    this.dragging = false;
    this.onContextMenu($event, this.selectedDates);
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
