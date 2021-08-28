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
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "../directives/column";
import { Subscription } from "rxjs";
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

  @ContentChild(GroupLabelDef, {read: TemplateRef})
  groupLabel: TemplateRef<any>;

  @ContentChildren(BeforeDateColumnDef)
  beforeDateColumns: QueryList<BeforeDateColumnDef>;

  @ContentChild(PageableColumnDef)
  pageableColumns: PageableColumnDef;

  @ContentChildren(AfterDateColumnDef)
  afterDateColumns: QueryList<AfterDateColumnDef>;

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
