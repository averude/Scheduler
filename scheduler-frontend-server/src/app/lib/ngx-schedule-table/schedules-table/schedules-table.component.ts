import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
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

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulesTableComponent implements OnInit, OnDestroy {
  @Input() groupable: boolean = true;
  @Input() selectionDisabled  = false;
  @Input() multipleSelect     = true;

  @Input() showSumColumns:    boolean;

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

  @Input() rowGroupData:  RowGroupData[];
  @Input() rowData:       RowData[];

  @Input() cellLabelSetter: CellLabelSetter;

  constructor() {
  }

  ngOnInit() {
    if (!this.cellLabelSetter) {
      this.cellLabelSetter = new SimpleCellLabelSetter();
    }
  }

  ngOnDestroy(): void {
  }
}
