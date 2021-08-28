import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { of, Subscription } from "rxjs";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { AuthService } from "../../../services/http/auth.service";
import { ScheduleTableDataSource } from "../data-sources/schedule-table.data-source";
import { SchedulerUtility, TRACK_BY_FN } from "../utils/scheduler-utility";
import { UserAccessRights } from "../../../model/user";
import { TableStateService } from "../../../lib/ngx-schedule-table/service/table-state.service";
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { TableManager } from "../schedule-table-composition-management/manager/table-manager";
import { ActivatedRoute } from "@angular/router";
import { UserAccountLevel } from "../../../model/dto/user-account-dto";
import { filter, map, switchMap } from "rxjs/operators";
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { Options } from "../../../lib/ngx-schedule-table/model/options";
import { InitialData } from "../../../model/datasource/initial-data";
import { TableDataCollector } from "../../../services/collectors/schedule/table-data.collector";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { UIPrioritySortingStrategy } from "../utils/ui-priority-sorting-strategy";
import { ScheduleFilteringStrategy } from "../utils/schedule-filtering-strategy";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  animations: [
    trigger('fadeOut', [
      state('void', style({
        opacity: '0',
        width: '0',
        display: 'none'
      })),
      transition('* => void', animate('400ms ease-in'))
    ])
  ],
  selector: 'app-schedule-table-component',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, AfterViewInit, OnDestroy {
  isAble: boolean = false;

  options: Options;

  enterpriseId: number;
  departmentId: number;

  accessRights:     UserAccessRights;
  isEditable:       boolean;
  proxyViewIsShown: boolean;
  filterIsShown:    boolean;
  showHiddenRows:   boolean = false;

  @ViewChild('paginator', { read: TemplateRef })
  paginator: TemplateRef<any>;

  initData:   InitialData;
  tableData:  TableData;

  private routeSub:         Subscription;
  private rowRenderSub:     Subscription;
  private editableStateSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private templateService: ToolbarTemplateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private sortingStrategy: UIPrioritySortingStrategy,
              private filteringStrategy: ScheduleFilteringStrategy,
              private tableRenderer: TableRenderer,
              public state: TableStateService,
              private dataSource: ScheduleTableDataSource,
              private tableDataCollector: TableDataCollector,
              public tableManager: TableManager,
              public utility: SchedulerUtility) {}

  private filterShownSub: Subscription;

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
          this.cd.detectChanges();

          if (this.departmentId && this.departmentId > 0) {

            const userAccount = this.authService.currentUserAccount;

            if (userAccount.level === UserAccountLevel.DEPARTMENT
              || userAccount.level === UserAccountLevel.ENTERPRISE) {

              return this.dataSource.byDepartmentId(this.enterpriseId, this.departmentId)
                .pipe(
                  map(initData => {
                    this.initData = initData;
                    return this.tableDataCollector.handleData(initData);
                  })
                );
            }

            if (userAccount.level === UserAccountLevel.SHIFT
              && userAccount.departmentIds.indexOf(this.departmentId) >= 0 ) {

              return this.dataSource.byShiftIds(this.enterpriseId, this.departmentId, userAccount.shiftIds)
                .pipe(
                  map(initData => {
                    this.initData = initData;
                    return this.tableDataCollector.handleData(initData);
                  })
                );
            }

            return of(undefined);
          }
        })
      )
      .subscribe((tableData: TableData) => {
        this.proxyViewIsShown = false;
        tableData.sortingStrategy = this.sortingStrategy;
        tableData.filteringStrategy = this.filteringStrategy;
        this.tableData = tableData;
        this.cd.detectChanges();
      });

    this.editableStateSub = this.state.editableGroupsState
      .subscribe(isEditable => {
        this.isEditable = isEditable;
        this.tableRenderer.renderAllRowGroups();
      });

    this.filterShownSub = this.state.isFilterIsShown()
      .subscribe(filterIsShown => this.filterIsShown = filterIsShown);

    this.options = {
      showSumColumns: this.accessRights?.isAdmin,
      multipleSelect: true,
      selectionEnabled: this.accessRights?.isAdmin,
      groupable: true,
      trackByFn: TRACK_BY_FN,
      groupIsShownFn: ((group: RowGroup) => {
        return this.isEditable || (group?.rows
          && group?.rows.length > 0
          && group.rows.some((row: any) => !row.hidden));
      }),
      rowIsShownFn: ((row: ScheduleRow) => {
        if (this.filterIsShown) {
          return !row.hidden;
        } else {
          return row.enabledCellCount > 0 || this.showHiddenRows;
        }
      })
    };
  }

  ngAfterViewInit() {
    this.templateService.changeTemplate(this.paginator);
  }

  ngOnDestroy(): void {
    this.templateService.changeTemplate(null);
    this.routeSub.unsubscribe();
    this.filterShownSub.unsubscribe();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
    if (this.editableStateSub) this.editableStateSub.unsubscribe();
  }

  isRowEditable(rowData: ScheduleRow): boolean {
    return this.isAble && this.isEditable;
  }

  onDateChange() {
    this.proxyViewIsShown = true;
    this.cd.detectChanges();
  }

  setIsAble() {
    this.isAble = (this.accessRights?.isDepartmentLevel || this.accessRights?.isEnterpriseLevel) && this.accessRights?.isAdmin;
  }

  changeHiddenRowsVisibility(isShown: boolean) {
    this.showHiddenRows = isShown;
    this.tableRenderer.renderAllRowGroups();
  }

  newRow(event: MouseEvent,
         rowGroup: RowGroup) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isAble && this.isEditable) {
      this.tableManager.newRow(rowGroup, this.initData);
    }
  }

  updateRow(rowData) {
    if (this.isRowEditable(rowData)) {
      this.tableManager.editRow(rowData, this.initData);
    }
  }

}
