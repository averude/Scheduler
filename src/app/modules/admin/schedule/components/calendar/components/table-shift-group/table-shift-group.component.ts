import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { Shift } from "../../../../../../../model/shift";
import { PaginatorService } from "../../../../../../../shared/paginators/paginator.service";
import { TableRowComponent } from "../table-row/table-row.component";
import { ContextMenuComponent } from "../../../../../../../lib/ngx-contextmenu/contextMenu.component";
import { ScheduleTableStatUtils } from "../../utils/schedule-table-stat-utils";
import { RowData } from "../../../../../../../model/ui/row-data";

@Component({
  selector: '[app-table-shift-group]',
  templateUrl: './table-shift-group.component.html',
  styleUrls: ['./table-shift-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableShiftGroupComponent implements OnInit, OnChanges {
  numberOfColumns: number;

  @Input() shift:         Shift;
  @Input() rowData:       RowData[] = [];
  @Input() workingTimeNorm: number;

  @Input() patternMenu:   ContextMenuComponent;

  isHidden: boolean = false;

  @ViewChildren(TableRowComponent)
  rows: QueryList<TableRowComponent>;

  constructor(private paginatorService: PaginatorService,
              private utils: ScheduleTableStatUtils) {}

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => {
        this.numberOfColumns = daysInMonth.length + 3;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
}
