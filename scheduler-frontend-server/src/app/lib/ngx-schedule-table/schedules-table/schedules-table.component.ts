import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef
} from "@angular/core";
import { RowGroupData } from "../model/data/row-group-data";
import { RowGroupCollector } from "../collectors/row-group-collector";
import { RowCollector } from "../collectors/row-collector";
import { TableTopItemDirective } from "../directives/table-top-item.directive";
import { AfterDateColumnDef, BeforeDateColumnDef } from "../directives/column";
import { PaginatorDef } from "../directives/paginator";
import { DatedCellDef, HeaderDateCellDef } from "../directives/cell";

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() showSumColumns:    boolean;

  @Input() rowGroupCollector: RowGroupCollector<any>;
  @Input() rowCollector:      RowCollector<any, any>;

  @ContentChild(PaginatorDef, {read: TemplateRef, static: false})
  paginator: TemplateRef<any>;

  @ContentChildren(TableTopItemDirective, {read: TemplateRef})
  topItems: QueryList<TemplateRef<any>>;

  @ContentChild(DatedCellDef, {read: TemplateRef, static: false})
  datedCellDef: DatedCellDef;

  @ContentChild(HeaderDateCellDef, {read: TemplateRef, static: false})
  headerDateCellDef: TemplateRef<any>;

  @ContentChildren(BeforeDateColumnDef)
  beforeDateColumns: QueryList<BeforeDateColumnDef>;

  @ContentChildren(AfterDateColumnDef)
  afterDateColumns: QueryList<AfterDateColumnDef>;

  rowGroups: RowGroupData[];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rowGroupCollector']) {
      this.getRowGroupsData();
    }
  }

  private getRowGroupsData() {
    if (this.rowGroupCollector) {
      this.rowGroups = this.rowGroupCollector.collect();
      this.cd.markForCheck();
    }
  }

  ngOnDestroy(): void {
  }
}
