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
import { RowGroup } from "../model/data/row-group";
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "../directives/column";
import { Subscription } from "rxjs";
import { TableRenderer } from "../service/table-renderer.service";
import { debounceTime, filter } from "rxjs/operators";
import { Row } from "../model/data/row";
import { Options } from "../model/options";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnDestroy {
  colspan:  number;

  @Input() trackByFn;

  @Input() options: Options;

  @Input() editableRowGroup: boolean;

  @Input() pageableColumns:   PageableColumnDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:         RowGroup;

  @Input() onAddRowClick:     EventEmitter<RowGroup>;

  private paginatorSub: Subscription;
  private rowGroupRenderSub: Subscription;

  isHiddenGroup: boolean = false;

  constructor(private paginatorService: PaginationService,
              private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {

    this.paginatorSub = this.paginatorService.onValueChange
      .subscribe(daysInMonth => {
        this.colspan = this.beforeDateColumns?.length + daysInMonth.length + this.afterDateColumns?.length;
      });

    this.rowGroupRenderSub = this.tableRenderer.onRenderRowGroup
      .pipe(
        filter(id => this.groupData.id === id),
        debounceTime(50)
      )
      .subscribe((id) => this.renderRows());
  }

  addRowToGroup() {
    if (this.onAddRowClick) {
      this.onAddRowClick.emit(this.groupData);
    }
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
    this.rowGroupRenderSub.unsubscribe();
  }

  renderRows() {
    if (this.groupData) {
      this.cd.detectChanges();
    }
  }

  isHidden(row: Row) {
    return row.cells.filter(cell => cell.enabled).length == 0;
  }
}
