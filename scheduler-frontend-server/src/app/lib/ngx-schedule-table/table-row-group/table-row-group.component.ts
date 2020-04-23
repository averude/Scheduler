import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { RowCollector } from "../collectors/row-collector";
import { PaginationService } from "../service/pagination.service";
import { RowGroupData } from "../model/data/row-group-data";
import { RowData } from "../model/data/row-data";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { DatedCellDef } from "../directives/cell";
import { Subscription } from "rxjs";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnChanges, OnDestroy {
  numberOfColumns:  number;
  rowData:          RowData[];

  @Input() datedCellDef:      DatedCellDef;

  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:       RowGroupData;
  @Input() rowCollector:    RowCollector<any, any>;

  private paginatorSub:           Subscription;

  isHidden: boolean = false;

  constructor(private paginatorService: PaginationService,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.paginatorSub = this.paginatorService.onValueChange
      .subscribe(daysInMonth => {
        this.numberOfColumns = 1 + daysInMonth.length + this.afterDateColumns.length;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getRows();
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  getRows() {
    if (this.rowCollector && this.groupData) {
      this.rowData = this.rowCollector.collect(this.groupData);
      this.cd.markForCheck();
    }
  }
}
