import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Employee } from '../../../../../../../model/employee';
import { Position } from '../../../../../../../model/position';
import { WorkDay } from '../../../../../../../model/workday';
import { Subscription } from 'rxjs';
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { DayType } from "../../../../../../../model/day-type";
import { SelectableRowDirective } from "../../../../../../../shared/directives/selectable-row.directive";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { TableCellComponent } from "../table-cell/table-cell.component";
import { ShowHoursService } from "../show-hours-control/show-hours.service";
import { ContextMenuData } from "../../../../../../../model/ui/context-menu-data";
import { ContextMenuService } from "../../../../../../../lib/ngx-contextmenu/contextMenu.service";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { ShiftSchedule } from "../../../../../../../model/shift-schedule";
import { ScheduleTableUtils } from "../../utils/schedule-table-utils";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements OnInit, OnChanges, OnDestroy {

  @Input() employee:      Employee;
  @Input() position:      Position;
  @Input() dayTypes:      DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];
  @Input() shiftSchedule: ShiftSchedule[];
  @Input() schedule:      WorkDay[];
  @Input() patternMenu:   ContextMenuComponent;

  @Input() workingTimeSum:  number = 0;
  @Input() workingTimeNorm: number;

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  // Table variables
  daysInMonth:  CalendarDay[];
  cellData;
  private contextMenuIsOpened = false;

  // Observable subscriptions
  private paginatorSub: Subscription;

  constructor(public elementRef: ElementRef,
              private cd: ChangeDetectorRef,
              private utils: ScheduleTableUtils,
              private paginatorService: PaginatorService,
              private showHoursService: ShowHoursService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.paginatorSub = this.paginatorService.dates
      .subscribe((daysInMonth: CalendarDay[]) => {
        this.daysInMonth = daysInMonth;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  onContextMenu($event: MouseEvent,
                selectedCells: TableCellComponent[]): void {
    if (selectedCells && this.selectableRowDirective.selectedCells.length > 0) {
      const data: ContextMenuData = {
        employeeId: this.employee.id,
        selectedCells: selectedCells,
        schedule: this.schedule
      };

      setTimeout(() => {
        if (!this.contextMenuIsOpened) {
          this.contextMenuService.show.next({
            contextMenu: this.patternMenu,
            event: $event,
            item: data,
          });
          this.contextMenuIsOpened = true;
          $event.preventDefault();
          $event.stopPropagation();
        }
      });
    }
  }

  clearSelection() {
    if (this.contextMenuIsOpened) {
      this.selectableRowDirective.clearSelection();
      this.contextMenuIsOpened = false;
    }
  }
}
