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
  public basicMenu: ContextMenuComponent;

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
    this.scheduleService.getSchedule(
        this.daysInMonth[0],
        this.daysInMonth[this.daysInMonth.length - 1],
        this.employee.id
      ).subscribe(value => this.schedule = value);
    this.patternService.getPatterns()
      .subscribe(value => this.patterns = value);
  }

  // maybe should be refactored
  getWorkDay(date: Date): Schedule {
    if (this.schedule !== undefined) {
      return this.schedule
        .find(value => value.date.getTime() === date.getTime());
    } else {
      return null;
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

  isWeekend(day: number): boolean {
    return day === 0 || day === 6;
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
      this.viewChildren.filter(item => item.selected));
  }

  onContextMenu($event: MouseEvent, item: any): void {
    setTimeout(() => {
      this.contextMenuService.show.next({
        contextMenu: this.basicMenu,
        event: $event,
        item: item,
      });
      $event.preventDefault();
      $event.stopPropagation();
    }, 10);
  }

  private generateSchedule(employeeId: number,
                           selectedCells: TableCellComponent[],
                           patternId: number) {
    this.scheduleGenerationService
      .generateSchedule(employeeId, selectedCells, patternId);
  }

  private clearSelection() {
    const selectedList = this.viewChildren.filter(item => item.selected);
    if (selectedList.length > 1) {
      selectedList.forEach(selectedItem => selectedItem.deselect());
    }
  }
}
