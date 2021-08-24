import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/http/auth.service";
import { SchedulerUtility } from "../utils/scheduler-utility";
import { Options } from "../../../lib/ngx-schedule-table/model/options";
import { UserAccessRights } from "../../../model/user";
import { InitialData } from "../../../model/datasource/initial-data";
import { filter, map, switchMap } from "rxjs/operators";
import { UserAccountLevel } from "../../../model/dto/user-account-dto";
import { Subscription } from "rxjs";
import { ScheduleViewTableDataSource } from "../data-sources/schedule-view-table.data-source";
import { ScheduleViewDataCollector } from "./schedule-view-data.collector";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";

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
  paginator:  TemplateRef<any>;

  initData:   InitialData;
  tableData:  TableData;

  private routeSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private templateService: ToolbarTemplateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
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

            if (userAccount.level === UserAccountLevel.DEPARTMENT
              || userAccount.level === UserAccountLevel.ENTERPRISE) {

              return this.dataSource.byViewId(this.enterpriseId, this.viewId)
                .pipe(
                  map(initData => {
                    this.initData = initData;
                    return this.tableDataCollector.collect(initData);
                  })
                );
            }
          }
        })
      )
      .subscribe(tableData => {
        this.proxyViewIsShown = false;
        this.tableData = tableData;
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
    this.routeSub.unsubscribe();
  }

  onDateChange() {
    this.proxyViewIsShown = true;
    this.cd.detectChanges();
  }

}
