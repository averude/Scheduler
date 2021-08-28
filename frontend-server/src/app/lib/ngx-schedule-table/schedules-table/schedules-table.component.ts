import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef
} from "@angular/core";
import { TableTopItemDirective } from "../directives/table-top-item.directive";
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "../directives/column";
import { PaginatorDef } from "../directives/paginator";
import { Subscription } from "rxjs";
import { ProxyViewDef } from "../directives/proxy-view";
import { TableRenderer } from "../service/table-renderer.service";
import { Options } from "../model/options";
import { TableData } from "../model/data/table";
import { GroupLabelDef } from "../directives/group-label";

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

  @Input() options: Options = DEFAULT_OPTIONS;
  @Input() tableData: TableData;

  @ContentChild(TableTopItemDirective, { read: TemplateRef })
  topItem: TemplateRef<any>;

  @ContentChild(PaginatorDef, { read: TemplateRef })
  paginator: TemplateRef<any>;

  @ContentChild(GroupLabelDef, {read: TemplateRef})
  groupLabel: TemplateRef<any>;

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

  private tableRenderSub: Subscription;

  constructor(private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.tableRenderSub = this.tableRenderer.onTableRender
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy(): void {
    if (this.tableRenderSub) this.tableRenderSub.unsubscribe();
  }
}
