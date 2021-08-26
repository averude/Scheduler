import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { GroupLabelDef } from "../directives/group-label";

@Component({
  selector: '[app-table-row-group]',
  templateUrl: './table-row-group.component.html',
  styleUrls: ['./table-row-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowGroupComponent implements OnInit, OnDestroy {
  groupIsShown: boolean;

  colspan:  number;

  @Input() options: Options;

  @Input() showHiddenRows:    boolean;

  @Input() pageableColumns:   PageableColumnDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;
  @Input() rowGroupLabel:     GroupLabelDef;

  @Input() groupData:         RowGroup;

  private rowGroupRenderSub:      Subscription;
  private allRowGroupsRenderSub:  Subscription;

  isHiddenGroup: boolean = false;

  constructor(private tableRenderer: TableRenderer,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.colspan = 99;

    this.groupIsShown = this.getGroupIsShown();

    this.rowGroupRenderSub = this.tableRenderer.onRenderRowGroup
      .pipe(
        filter(id => this.groupData.id === id),
      )
      .subscribe((id) => this.renderRows());

    this.allRowGroupsRenderSub = this.tableRenderer.onRenderAllRowGroups
      .pipe(
        debounceTime(50)
      )
      .subscribe(() => this.renderRows());
  }

  private getGroupIsShown() {
    return this.options.groupIsShownFn ? this.options.groupIsShownFn(this.groupData) : true;
  }

  ngOnDestroy(): void {
    this.rowGroupRenderSub.unsubscribe();
    this.allRowGroupsRenderSub.unsubscribe();
  }

  renderRows() {
    if (this.groupData) {
      this.groupIsShown = this.getGroupIsShown();
      this.cd.detectChanges();
    }
  }

}
