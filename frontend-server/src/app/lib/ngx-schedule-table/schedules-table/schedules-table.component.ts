import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from "@angular/core";
import { RowGroup } from "../model/data/row-group";
import { TableTopItemDirective } from "../directives/table-top-item.directive";
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "../directives/column";
import { PaginatorDef } from "../directives/paginator";
import { Row } from "../model/data/row";
import { TableStateService } from "../service/table-state.service";
import { Subscription } from "rxjs";
import { ProxyViewDef } from "../directives/proxy-view";
import { TableRenderer } from "../service/table-renderer.service";
import { Options } from "../model/options";

const DEFAULT_OPTIONS: Options = {
  selectionEnabled: false,
  multipleSelect:   true,
  showSumColumns:   false,
  distinctByColor:  false,
  groupable:        true,
};

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesTableComponent implements OnInit, OnDestroy {
  @Input() trackByFn;

  @Input() options: Options = DEFAULT_OPTIONS;

  @Input() proxyViewIsShown:  boolean = false;
  @Input() editableRowGroup:  boolean = false;
  @Input() showHiddenRows:    boolean = true;

  @ContentChild(PaginatorDef, { read: TemplateRef })
  paginator: TemplateRef<any>;

  @ContentChildren(TableTopItemDirective, {read: TemplateRef})
  topItems: QueryList<TemplateRef<any>>;

  @ContentChildren(BeforeDateColumnDef)
  beforeDateColumns: QueryList<BeforeDateColumnDef>;

  @ContentChild(PageableColumnDef)
  pageableColumns: PageableColumnDef;

  @ContentChildren(AfterDateColumnDef)
  afterDateColumns: QueryList<AfterDateColumnDef>;

  @ContentChild(ProxyViewDef, {read: TemplateRef})
  proxyViewDef: TemplateRef<any>;

  @Input() rowGroupData:  RowGroup[];

  @Input() rowData:       Row[];

  @Output() onAddRowClick: EventEmitter<RowGroup> = new EventEmitter();

  private tableStateSub: Subscription;
  private tableRenderSub: Subscription;

  constructor(private tableStateService: TableStateService,
              private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.tableStateSub = this.tableStateService.editableGroupsState
      .subscribe(editableRowGroup => this.editableRowGroup = editableRowGroup);

    this.tableRenderSub = this.tableRenderer.onTableRender
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy(): void {
    if (this.tableStateSub) this.tableStateSub.unsubscribe();
    if (this.tableRenderSub) this.tableRenderSub.unsubscribe();
  }
}
