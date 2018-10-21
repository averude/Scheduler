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
import { PatternService } from '../../../../../services/pattern.service';
import { Schedule } from '../../../../../model/schedule';
import { Pattern } from '../../../../../model/pattern';
import { PaginatorService } from '../../paginator.service';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit, OnDestroy {

  @Input() employee: Employee;

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
  schedule: Schedule[];
  patterns: Pattern[];
  sum = 0;

  // Observable subscriptions
  private paginatorSub: Subscription;

  constructor(private scheduleService: ScheduleService,
              private scheduleGenerationService: ScheduleGenerationService,
              private patternService: PatternService,
              private paginatorService: PaginatorService,
              private contextMenuService: ContextMenuService) { }

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
    this.patternService.findAll()
      .subscribe(patterns => this.patterns = patterns);
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  getWorkDay(date: Date): Schedule {
    if (this.schedule) {
      const dateISO = date.toISOString().split('T')[0];
      return this.schedule
        .find(value => value.date === dateISO);
    } else {
      return null;
    }
  }

  calculateSum(): number | void {
    if (this.schedule) {
      this.sum = this.schedule
        .map(sched => sched.hours)
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
    this.scheduleGenerationService
      .generateScheduleByPatternId(
        this.employee.id,
        this.schedule,
        dates,
        patternId,
        this.scheduleGeneratedHandler);
  }

  private get scheduleGeneratedHandler(): any {
    return (createdSchedule, updatedSchedule) => {
      if (createdSchedule.length > 0) {
        this.scheduleService.create(this.employee.id, createdSchedule)
          .subscribe(res => {
              res.forEach(value => this.schedule.push(value));
              this.calculateSum();
            },
              err => console.log(err)
          );
        }
      if (updatedSchedule.length > 0) {
        this.scheduleService.update(this.employee.id, updatedSchedule)
          .subscribe(res => this.calculateSum(),
            err => console.log(err));
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
