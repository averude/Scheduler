import { ChangeDetectionStrategy, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Shift } from "../../../../../../../model/shift";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { TableRowComponent } from "../table-row/table-row.component";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { RowData } from "../../../../../../../model/ui/row-data";
import { DayType } from "../../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../../model/day-type-group";
import { CalendarDay } from "../../../../../../../model/ui/calendar-day";

@Component({
  selector: '[app-table-shift-group]',
  templateUrl: './table-shift-group.component.html',
  styleUrls: ['./table-shift-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableShiftGroupComponent implements OnInit {
  numberOfColumns: number;

  @Input() shift:         Shift;
  @Input() rowData:       RowData[];
  @Input() workingTimeNorm: number;

  @Input() dayTypes: DayType[];
  @Input() dayTypeGroups: DayTypeGroup[];
  @Input() daysInMonth: CalendarDay[];

  @Input() patternMenu:   ContextMenuComponent;

  isHidden: boolean = false;

  @ViewChildren(TableRowComponent)
  rows: QueryList<TableRowComponent>;

  constructor(private paginatorService: PaginatorService) {}

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => {
        this.numberOfColumns = daysInMonth.length + 4;
      });
  }
}
