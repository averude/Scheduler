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
import { Subscription } from "rxjs";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { AuthService } from "../../../services/http/auth.service";
import { CELL_TRACK_BY_FN, SchedulerUtility } from "../utils/scheduler-utility";
import { UserAccessRights } from "../../../model/user";
import { TableStateService } from "../../../lib/ngx-schedule-table/service/table-state.service";
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { TableManager } from "../schedule-table-composition-management/manager/table-manager";
import { ActivatedRoute } from "@angular/router";
import { filter, map, switchMap } from "rxjs/operators";
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { Options } from "../../../lib/ngx-schedule-table/model/options";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { fadeOutAnimation } from "../utils/animations";
import { DataSourceFacade } from "../data-sources/data-source.facade";
import { CalendarInitData } from "../model/calendar-init-data";

@Component({
  animations: [fadeOutAnimation],
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

  calendarInitData: CalendarInitData;
  tableData:        TableData;

  private routeSub:         Subscription;
  private rowRenderSub:     Subscription;
  private editableStateSub: Subscription;
  private filterShownSub:   Subscription;

  constructor(private cd: ChangeDetectorRef,
              private templateService: ToolbarTemplateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private tableRenderer: TableRenderer,
              public state: TableStateService,
              private tableManager: TableManager,
              private dataSourceFacade: DataSourceFacade,
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
          this.cd.detectChanges();

          if (this.departmentId && this.departmentId > 0) {
            const userAccount = this.authService.currentUserAccount;
            return this.dataSourceFacade.getData(this.enterpriseId, this.departmentId, userAccount);
          }
        })
      )
      .subscribe(([initData, tableData]: [CalendarInitData, TableData]) => {
        this.proxyViewIsShown = false;
        this.calendarInitData = initData;
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
      trackByFn: CELL_TRACK_BY_FN,
      groupIsShownFn: ((group: RowGroup) => {
        return this.isEditable && !group.value.hidden || (group?.rows
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
      this.tableManager.newRow(rowGroup, this.calendarInitData);
    }
  }

  updateRow(rowData) {
    if (this.isRowEditable(rowData)) {
      this.tableManager.editRow(rowData, this.calendarInitData);
    }
  }

}
