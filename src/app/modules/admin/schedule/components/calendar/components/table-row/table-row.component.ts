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
import { SelectableRowDirective } from "../../../../../../../shared/directives/selectable-row.directive";
import { TableCellComponent } from "../table-cell/table-cell.component";
import { ShowHoursService } from "../show-hours-control/show-hours.service";
import { ContextMenuData } from "../../../../../../../model/ui/context-menu-data";
import { ContextMenuService } from "../../../../../../../lib/ngx-contextmenu/contextMenu.service";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { CellData } from "../../../../../../../model/ui/cell-data";
import { ScheduleTableStatUtils } from "../../utils/schedule-table-stat-utils";
import { CellDataCollector } from "../../../../../../../shared/transformers/collectors/cell-data-collector";
import { ShiftComposition } from "../../../../../../../model/shift-composition";
import { WorkDay } from "../../../../../../../model/workday";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";
import { RowChangeDetection } from "../table-service/row-change-detection";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { getEmployeeShortName } from "../../../../../../../shared/utils/utils";

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements OnInit, OnChanges, OnDestroy {

  @Input() shiftId:           number;
  @Input() employee:          Employee;
  @Input() position:          Position;
  @Input() isSubstitution:    boolean;
  @Input() schedule:          WorkDay[];
  @Input() shiftComposition:  ShiftComposition[];
  @Input() dayTypes:          DayType[];
  @Input() dayTypeGroups:     DayTypeGroup[];
  @Input() daysInMonth:       CalendarDay[];

  @Input() workingTimeSum:    number = 0;
  @Input() workingTimeNorm:   number;
  workingTimeDiff: number;

  @Input() patternMenu:       ContextMenuComponent;

  cellData: CellData[];

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  private contextMenuIsOpened = false;
  private rowCdSubscription: Subscription;

  constructor(public elementRef: ElementRef,
              private cd: ChangeDetectorRef,
              private rowCd: RowChangeDetection,
              private collector: CellDataCollector,
              private statUtils: ScheduleTableStatUtils,
              private showHoursService: ShowHoursService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
    this.rowCdSubscription = this.rowCd.onChange
      .pipe(filter(employeeId => this.employee.id === employeeId))
      .subscribe(employeeId => {
        console.debug('Row with employee id: ' + employeeId + ' marked for check');
        this.getCells();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schedule'] && changes['schedule'].isFirstChange()) {
      this.getCells();
    }
  }

  ngOnDestroy(): void {
    this.rowCdSubscription.unsubscribe();
  }

  onContextMenu($event: MouseEvent,
                selectedCells: TableCellComponent[]): void {
    if (selectedCells && this.selectableRowDirective.selectedCells.length > 0) {
      const data: ContextMenuData = {
        selectedCells: selectedCells,
        row: this
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

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }

  clearSelection() {
    if (this.contextMenuIsOpened) {
      this.selectableRowDirective.clearSelection();
      this.contextMenuIsOpened = false;
    }
  }

  calcWorkingTimeDiff() {
    this.workingTimeDiff = this.workingTimeNorm - this.workingTimeSum;
  }

  recalc() {
    this.workingTimeSum = this.statUtils.calculateOverallWorkingTimeSum(this.schedule);
  }

  getCells() {
    this.cellData = this.collector.getCells(
      this.employee.id,
      this.shiftId,
      this.isSubstitution,
      this.shiftComposition,
      this.schedule,
      this.dayTypes,
      this.dayTypeGroups,
      this.daysInMonth
    );
    this.recalc();
    this.calcWorkingTimeDiff();
    this.cd.markForCheck();
  }
}
