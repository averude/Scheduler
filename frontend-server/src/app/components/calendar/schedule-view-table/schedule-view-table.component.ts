import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/http/auth.service";
import { ScheduleTablePaginationStrategy } from "../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { SchedulerUtility } from "../utils/scheduler-utility";
import { Options } from "../../../lib/ngx-schedule-table/model/options";
import { UserAccessRights } from "../../../model/user";
import { InitialData } from "../../../model/datasource/initial-data";
import { filter, map, switchMap } from "rxjs/operators";
import { UserAccountAuthority } from "../../../model/dto/user-account-dto";
import { of, Subscription } from "rxjs";
import { ScheduleViewTableDataSource } from "../data-sources/schedule-view-table.data-source";
import { ScheduleViewDataCollector } from "./schedule-view-data.collector";
import { Row } from "../../../lib/ngx-schedule-table/model/data/row";
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";

@Component({
  selector: 'app-schedule-view-table',
  templateUrl: './schedule-view-table.component.html',
  styleUrls: ['./schedule-view-table.component.css'],
  providers: [ScheduleViewDataCollector, ScheduleViewTableDataSource]
})
export class ScheduleViewTableComponent implements OnInit, AfterViewInit, OnDestroy {

  options: Options;

  enterpriseId: number;
  departmentId: number;

  viewId: number;

  accessRights:     UserAccessRights;
  proxyViewIsShown: boolean;

  @ViewChild('paginator', { read: TemplateRef })
  paginator: TemplateRef<any>;

  initData: InitialData;

  rowData: Row[];

  private routeSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private templateService: ToolbarTemplateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              public  paginationStrategy: ScheduleTablePaginationStrategy,
              private paginationService: PaginationService,
              private dataSource: ScheduleViewTableDataSource,
              private tableDataCollector: ScheduleViewDataCollector,
              public utility: SchedulerUtility) { }

  ngOnInit(): void {

    this.accessRights = this.authService.currentUserValue.accessRights;
    this.enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.routeSub = this.activatedRoute.params
      .pipe(
        filter(value => value.viewId),
        map(value => value.viewId),
        switchMap(viewId => {
          this.viewId = Number.parseInt(viewId);

          this.proxyViewIsShown = true;
          this.cd.detectChanges();

          if (this.viewId && this.viewId > 0) {

            const userAccount = this.authService.currentUserAccount;

            if (userAccount.authority === UserAccountAuthority.DEPARTMENT_ADMIN
              || userAccount.authority === UserAccountAuthority.ENTERPRISE_ADMIN) {

              return this.dataSource.byViewId(this.enterpriseId, this.viewId)
                .pipe(
                  map(initData => {
                    this.initData = initData;
                    return this.tableDataCollector.collect(initData)
                      .groups[0]
                      .rows.sort((a: ScheduleRow, b: ScheduleRow) => a.employee.secondName.localeCompare(b.employee.secondName));
                  })
                );
            }

            return of([]);
          }
        })
      )
      .subscribe(rows => {
        this.proxyViewIsShown = false;
        this.rowData = rows;
        this.cd.detectChanges();
      });

    this.options = {
      groupable: false,
      selectionEnabled: false,
      multipleSelect: false,
      showSumColumns: false,
      distinctByColor: false
    };
  }

  ngAfterViewInit() {
    this.templateService.changeTemplate(this.paginator);
  }

  ngOnDestroy(): void {
    this.templateService.changeTemplate(null);
    this.paginationService.clearStoredValue();
    this.routeSub.unsubscribe();
  }

  onDateChange() {
    this.proxyViewIsShown = true;
    this.cd.detectChanges();
  }

}
