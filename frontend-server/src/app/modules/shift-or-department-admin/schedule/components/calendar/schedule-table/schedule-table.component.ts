import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { Subscription } from "rxjs";
import { ScheduleTablePaginationStrategy } from "../../../../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { SchedulerCellLabelSetter } from "../utils/scheduler-cell-label-setter";
import { TableRenderer } from "../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableSumCalculator } from "../../../../../../services/calculators/table-sum-calculator.service";
import { AuthService } from "../../../../../../services/http/auth.service";
import { TableDataSource } from "../../../../../../services/collectors/schedule/table-data-source";
import { SchedulerUtility } from "../utils/scheduler-utility";
import { UserAccessRights } from "../../../../../../model/user";
import { TableStateService } from "../../../../../../lib/ngx-schedule-table/service/table-state.service";
import { Row } from "../../../../../../model/ui/schedule-table/table-data";

@Component({
  selector: 'app-schedule-table-component',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnDestroy {
  accessRights: UserAccessRights;
  isEditable:   boolean;

  tableData: RowGroupData[];

  private dataSourceSub:    Subscription;
  private rowRenderSub:     Subscription;
  private editableStateSub: Subscription;

  constructor(private authService: AuthService,
              private cd: ChangeDetectorRef,
              public  cellLabelSetter: SchedulerCellLabelSetter,
              public  paginationStrategy: ScheduleTablePaginationStrategy,
              private paginationService: PaginationService,
              private tableRenderer: TableRenderer,
              private sumCalculator: TableSumCalculator,
              public state: TableStateService,
              public dataSource: TableDataSource,
              public utility: SchedulerUtility) {}

  ngOnInit() {
    this.dataSourceSub = this.dataSource.tableData
      .subscribe(tableData => {
        this.tableData = tableData;
        this.cd.markForCheck();
      });

    this.editableStateSub = this.state.editableGroupsState
      .subscribe(isEditable => this.isEditable = isEditable);

    this.accessRights = this.authService.currentUserValue.accessRights;

    this.rowRenderSub = this.tableRenderer.onRenderRow
      .subscribe(rowId => this.sumCalculator.calculateWorkHoursSum(this.tableData, rowId));
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
    if (this.dataSourceSub) this.dataSourceSub.unsubscribe();
    if (this.editableStateSub) this.editableStateSub.unsubscribe();
  }

  isRowEditable(rowData: Row): boolean {
    return this.accessRights.isDepartmentLevel && this.isEditable;
  }
}
