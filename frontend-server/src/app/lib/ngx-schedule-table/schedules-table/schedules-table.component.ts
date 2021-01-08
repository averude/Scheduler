import {
  AfterViewInit,
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
import { RowGroupData } from "../model/data/row-group-data";
import { TableTopItemDirective } from "../directives/table-top-item.directive";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { PaginatorDef } from "../directives/paginator";
import { DatedCellDef, HeaderDateCellDef } from "../directives/cell";
import { RowData } from "../model/data/row-data";
import { CellLabelSetter, SimpleCellLabelSetter } from "../utils/cell-label-setter";
import { TableStateService } from "../service/table-state.service";
import { Subscription } from "rxjs";
import { ProxyViewDef } from "../directives/proxy-view";
import { TableRenderer } from "../service/table-renderer.service";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() proxyViewIsShown: boolean = false;

  @Input() groupable: boolean = true;
  @Input() selectionEnabled   = false;
  @Input() multipleSelect     = true;

  @Input() showSumColumns:    boolean;
  @Input() editableRowGroup:  boolean = false;

  @ContentChild(PaginatorDef, { read: TemplateRef })
  paginator: TemplateRef<any>;

  @ContentChildren(TableTopItemDirective, {read: TemplateRef})
  topItems: QueryList<TemplateRef<any>>;

  @ContentChild(DatedCellDef, { read: TemplateRef })
  datedCellDef: DatedCellDef;

  @ContentChild(HeaderDateCellDef, { read: TemplateRef })
  headerDateCellDef: TemplateRef<any>;

  @ContentChildren(BeforeDateColumnDef)
  beforeDateColumns: QueryList<BeforeDateColumnDef>;

  @ContentChildren(AfterDateColumnDef)
  afterDateColumns: QueryList<AfterDateColumnDef>;

  @ContentChild(ProxyViewDef, {read: TemplateRef})
  proxyViewDef: TemplateRef<any>;

  @Input() rowGroupData:  RowGroupData[];

  @Input() rowData:       RowData[];
  @Input() cellLabelSetter: CellLabelSetter;

  @Output() onAddRowClick: EventEmitter<RowGroupData> = new EventEmitter();

  colspan: number;

  private tableStateSub: Subscription;
  private tableRenderSub: Subscription;

  constructor(private tableStateService: TableStateService,
              private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.cellLabelSetter) {
      this.cellLabelSetter = new SimpleCellLabelSetter();
    }

    this.tableStateSub = this.tableStateService.editableGroupsState
      .subscribe(editableRowGroup => this.editableRowGroup = editableRowGroup);

    this.tableRenderSub = this.tableRenderer.onTableRender.subscribe(() => this.cd.markForCheck());
  }

  ngAfterViewInit(): void {
    this.colspan = this.beforeDateColumns?.length + 31 + this.afterDateColumns?.length;
  }

  ngOnDestroy(): void {
    if (this.tableStateSub) this.tableStateSub.unsubscribe();
    if (this.tableRenderSub) this.tableRenderSub.unsubscribe();
  }
}
