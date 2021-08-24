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
import { RowGroup } from "../model/data/row-group";
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "../directives/column";
import { Subscription } from "rxjs";
import { TableRenderer } from "../service/table-renderer.service";
import { debounceTime, filter } from "rxjs/operators";
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

  @Input() editableRowGroup:  boolean;
  @Input() showHiddenRows:    boolean;

  @Input() pageableColumns:   PageableColumnDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() groupData:         RowGroup;

  @Input() onAddRowClick:     EventEmitter<RowGroup>;

  private rowGroupRenderSub: Subscription;

  isHiddenGroup: boolean = false;

  constructor(private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.colspan = 99;

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
    this.rowGroupRenderSub.unsubscribe();
  }

  renderRows() {
    if (this.groupData) {
      this.cd.detectChanges();
    }
  }
}
