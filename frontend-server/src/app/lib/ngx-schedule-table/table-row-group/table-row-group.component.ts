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
import { filter } from "rxjs/operators";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnDestroy {
  colspan:  number;

  @Input() trackByFn;

  @Input() selectionEnabled:  boolean;
  @Input() multipleSelect:    boolean;
  @Input() editableRowGroup:  boolean;
  @Input() showSumColumns:    boolean;
  @Input() distinctByColor:   boolean;

  @Input() pageableColumns:   PageableColumnDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:         RowGroup;

  @Input() onAddRowClick:     EventEmitter<RowGroup>;

  private paginatorSub: Subscription;
  private rowGroupRenderSub: Subscription;

  isHidden: boolean = false;

  constructor(private paginatorService: PaginationService,
              private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.paginatorSub = this.paginatorService.onValueChange
      .subscribe(daysInMonth => {
        this.colspan = this.beforeDateColumns?.length + daysInMonth.length + this.afterDateColumns?.length;
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
