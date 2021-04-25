import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { of, Subscription } from "rxjs";
import { ScheduleTablePaginationStrategy } from "../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableSumCalculator } from "../../../services/calculators/table-sum-calculator.service";
import { AuthService } from "../../../services/http/auth.service";
import { TableDataSource } from "../../../services/collectors/schedule/table-data-source";
import { SchedulerUtility } from "../utils/scheduler-utility";
import { UserAccessRights } from "../../../model/user";
import { TableStateService } from "../../../lib/ngx-schedule-table/service/table-state.service";
import { ScheduleCell, ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { TableManager } from "../../../services/collectors/schedule/table-manager";
import { ActivatedRoute } from "@angular/router";
import { UserAccountAuthority } from "../../../model/dto/user-account-dto";
import { filter, map, switchMap } from "rxjs/operators";
import { WorkDay } from "../../../model/workday";
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { Options } from "../../../lib/ngx-schedule-table/model/options";
import { InitialData } from "../../../model/datasource/initial-data";
import { TableDataCollector } from "../../../services/collectors/schedule/table-data.collector";

@Component({
  selector: 'app-schedule-table-component',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, AfterViewInit, OnDestroy {
  isAble: boolean = false;

  trackByFn = (index: number, item: ScheduleCell) => {
    const value = <WorkDay> item.value;
    if (value) {
      return item.enabled + ':' + value.actualDayTypeId + '-'
        + value.scheduledDayTypeId
        + '-' + value.startTime
        + '-' + value.endTime
        + '-' + value.breakStartTime
        + '-' + value.breakEndTime;
    } else {
      return item.enabled;
    }
  };

  options: Options;

  enterpriseId: number;
  departmentId: number;

  accessRights:     UserAccessRights;
  isEditable:       boolean;
  proxyViewIsShown: boolean;

  @ViewChild('paginator', { read: TemplateRef })
  paginator: TemplateRef<any>;

  initData: InitialData;

  tableData: RowGroup[];

  private routeSub:         Subscription;
  private rowRenderSub:     Subscription;
  private editableStateSub: Subscription;

  constructor(private templateService: ToolbarTemplateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              public  paginationStrategy: ScheduleTablePaginationStrategy,
              private paginationService: PaginationService,
              private tableRenderer: TableRenderer,
              private sumCalculator: TableSumCalculator,
              public state: TableStateService,
              private dataSource: TableDataSource,
              private tableDataCollector: TableDataCollector,
              public tableManager: TableManager,
              public utility: SchedulerUtility) {}

  ngOnInit() {
    this.accessRights = this.authService.currentUserValue.accessRights;
    this.enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.setIsAble();

    this.routeSub = this.activatedRoute.params
      .pipe(
        filter(value => value.departmentId),
        map(value => value.departmentId),
        switchMap(departmentId => {
          this.departmentId = Number.parseInt(departmentId);

          this.proxyViewIsShown = true;
          this.tableRenderer.renderTable();

          if (this.departmentId && this.departmentId > 0) {

            const userAccount = this.authService.currentUserAccount;

            if (userAccount.authority === UserAccountAuthority.DEPARTMENT_ADMIN
              || userAccount.authority === UserAccountAuthority.ENTERPRISE_ADMIN) {

              return this.dataSource.byDepartmentId(this.departmentId)
                .pipe(
                  map(initData => {
                    this.initData = initData;
                    return this.tableDataCollector.handleData(initData);
                  })
                );
            }

            if (userAccount.authority === UserAccountAuthority.SHIFT_ADMIN
              && userAccount.departmentIds.indexOf(this.departmentId) >= 0 ) {

              return this.dataSource.byShiftIds(this.departmentId, userAccount.shiftIds)
                .pipe(
                  map(initData => {
                    this.initData = initData;
                    return this.tableDataCollector.handleData(initData);
                  })
                );
            }

            return of([]);
          }
        })
      )
      .subscribe(tableData => {
        this.proxyViewIsShown = false;
        this.tableData = tableData;
        this.tableRenderer.renderTable();
      });

    this.editableStateSub = this.state.editableGroupsState
      .subscribe(isEditable => this.isEditable = isEditable);

    this.rowRenderSub = this.tableRenderer.onRenderRow
      .subscribe(rowId => this.sumCalculator.calculateWorkHoursSum(this.tableData, rowId));

    this.options = {
      showSumColumns: this.accessRights?.isAdmin,
      multipleSelect: true,
      selectionEnabled: this.accessRights?.isAdmin,
      groupable: true
    };
  }

  ngAfterViewInit() {
    this.templateService.changeTemplate(this.paginator);
  }

  ngOnDestroy(): void {
    this.templateService.changeTemplate(null);
    this.paginationService.clearStoredValue();
    this.routeSub.unsubscribe();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
    if (this.editableStateSub) this.editableStateSub.unsubscribe();
  }

  isRowEditable(rowData: ScheduleRow): boolean {
    return this.isAble && this.isEditable;
  }

  onDateChange() {
    this.proxyViewIsShown = true;
    this.tableRenderer?.renderTable();
  }

  setIsAble() {
    this.isAble = (this.accessRights?.isDepartmentLevel || this.accessRights?.isEnterpriseLevel) && this.accessRights?.isAdmin;
  }
}
