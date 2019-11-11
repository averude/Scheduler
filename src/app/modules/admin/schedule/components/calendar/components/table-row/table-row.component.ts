import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
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

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements OnInit {

  @Input() employee:      Employee;
  @Input() position:      Position;
  @Input() cellData:      CellData[];
  @Input() patternMenu:   ContextMenuComponent;

  @Input() workingTimeSum:  number = 0;
  @Input() workingTimeNorm: number;

  @Input() isSubstitution: boolean;

  @ViewChild(SelectableRowDirective)
  selectableRowDirective: SelectableRowDirective;

  @ViewChildren(TableCellComponent)
  cells: QueryList<TableCellComponent>;

  private contextMenuIsOpened = false;

  constructor(public elementRef: ElementRef,
              private statUtils: ScheduleTableStatUtils,
              private showHoursService: ShowHoursService,
              private contextMenuService: ContextMenuService) { }

  ngOnInit() {
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
    return employee.secondName + ' '
      + employee.firstName.charAt(0) + '.' + ' '
      + employee.patronymic.charAt(0) + '.';
  }

  clearSelection() {
    if (this.contextMenuIsOpened) {
      this.selectableRowDirective.clearSelection();
      this.contextMenuIsOpened = false;
    }
  }

  recalc() {
    this.workingTimeSum = this.statUtils.calculateCellsWorkingTimeSum(this.cells);
  }
}
