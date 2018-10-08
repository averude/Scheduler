import {Component, ViewChildren, Input, OnInit, QueryList, HostListener, ViewChild} from '@angular/core';
import {Schedule} from '../../../model/schedule';
import {Employee} from '../../../model/employee';
import {ScheduleService} from '../../../services/schedule.service';
import {TableCellComponent} from '../table-cell/table-cell.component';
import {ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';
import {PatternService} from '../../../services/pattern.service';
import {Pattern} from '../../../model/pattern';
import {ScheduleGenerationService} from '../../../services/schedule-generation.service';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() daysInMonth: Date[];
  @Input() employee: Employee;

  @ViewChild(ContextMenuComponent)
  public patternMenu: ContextMenuComponent;

  @ViewChildren(TableCellComponent)
  viewChildren: QueryList<TableCellComponent>;

  dragging = false;

  schedule: Schedule[];
  patterns: Pattern[];

  constructor(private scheduleService: ScheduleService,
              private scheduleGenerationService: ScheduleGenerationService,
              private patternService: PatternService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.scheduleService.getByDate(
        this.daysInMonth[0],
        this.daysInMonth[this.daysInMonth.length - 1],
        this.employee.id
      ).subscribe(value => this.schedule = value);
    this.patternService.findAll()
      .subscribe(value => this.patterns = value);
  }

  // should be refactored
  getValue(date: Date): any {
    if (this.schedule !== undefined) {
      const workDay = this.schedule
        .find(value => value.date.getTime() === date.getTime());
      if (workDay !== null && workDay !== undefined) {
        if (workDay.label !== null && workDay.label !== undefined) {
          return workDay.label;
        } else {
          return workDay.hours;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  getSum(): number {
    if (this.schedule === undefined || this.schedule === null) {
      return 0;
    } else {
      return this.schedule
        .filter(sched => sched.date.getMonth() === this.daysInMonth[0].getMonth())
        .map(sched => sched.hours)
        .reduce((prev, curr) => prev + curr, 0);
    }
  }

  isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  @HostListener('mousedown')
  mouseDown() {
    this.clearSelection();
    this.dragging = true;
  }

  @HostListener('mouseup', ['$event'])
  mouseUp($event: MouseEvent) {
    this.dragging = false;
    this.onContextMenu($event,
      this.viewChildren
        .filter(cell => cell.selected)
        .map(cell => cell.day));
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

  generateSchedule(employeeId: number,
                   dates: Date[],
                   patternId: number) {
    this.clearSelection();
    this.scheduleGenerationService
      .generateSchedule(employeeId, this.schedule, dates, patternId);
  }

  private clearSelection() {
    const selectedList = this.viewChildren.filter(item => item.selected);
    if (selectedList.length > 1) {
      selectedList.forEach(selectedItem => selectedItem.deselect());
    }
  }
}
