import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { PaginationService } from "../service/pagination.service";
import { RowGroupData } from "../model/data/row-group-data";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { DatedCellDef } from "../directives/cell";
import { Subscription } from "rxjs";
import { CellLabelSetter } from "../utils/cell-label-setter";
import { TableRenderer } from "../service/table-renderer.service";
import { filter } from "rxjs/operators";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnDestroy {
  numberOfColumns:  number;

  @Input() selectionDisabled: boolean;
  @Input() multipleSelect:    boolean;
  @Input() editableRowGroup:  boolean;

  @Input() datedCellDef:      DatedCellDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:         RowGroupData;

  @Input() cellLabelSetter:   CellLabelSetter;

  @Input() onAddRowClick:     EventEmitter<RowGroupData>;

  private paginatorSub: Subscription;
  private rowGroupRenderSub: Subscription;

  isHidden: boolean = false;

  constructor(private paginatorService: PaginationService,
              private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.paginatorSub = this.paginatorService.onValueChange
      .subscribe(daysInMonth => {
        this.numberOfColumns = 1 + daysInMonth.length + this.afterDateColumns.length;
      });

    this.rowGroupRenderSub = this.tableRenderer.onRenderRowGroup
      .pipe(filter(id => this.groupData.id === id))
      .subscribe((id) => this.renderRows());
  }

  addRowToGroup() {
    if (this.onAddRowClick) {
      this.onAddRowClick.emit(this.groupData);
    }
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  renderRows() {
    if (this.groupData) {
      this.cd.markForCheck();
    }
  }
}
