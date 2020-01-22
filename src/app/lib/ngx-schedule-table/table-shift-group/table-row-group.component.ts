import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { CellCollector } from "../collectors/cell-collector";
import { RowCollector } from "../collectors/row-collector";
import { DatePaginationService } from "../service/date-pagination.service";
import { RowGroupData } from "../model/data/row-group-data";
import { RowData } from "../model/data/row-data";
import { CellLabelSetter } from "../utils/cell-label-setter";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { DatedCellDef } from "../directives/cell";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnChanges {
  numberOfColumns:  number;
  rowData:          RowData[];

  @Input() datedCellDef:      DatedCellDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:       RowGroupData;
  @Input() workingTimeNorm: number;

  @Input() cellCollector:   CellCollector<any, any>;
  @Input() rowCollector:    RowCollector<any, any>;
  @Input() cellLabelSetter: CellLabelSetter;

  isHidden: boolean = false;

  constructor(private paginatorService: DatePaginationService,
              private cd: ChangeDetectorRef,) {}

  ngOnInit() {
    this.paginatorService.dates
      .subscribe(daysInMonth => {
        this.numberOfColumns = 1 + daysInMonth.length + this.afterDateColumns.length;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.rowCollector && this.groupData) {
      this.getRows();
    }
  }

  getRows() {
    this.rowData = this.rowCollector.collect(this.groupData);
    this.cd.markForCheck();
  }
}
