import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { SummationMode } from "../../../model/dto/employee-work-stat-dto";
import { Subscription } from "rxjs";
import { SummationColumn } from "../../../model/summation-column";
import { Employee } from "../../../model/employee";
import { getEmployeeShortName } from "../../../shared/utils/utils";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { AuthService } from "../../../services/http/auth.service";
import { UserAccountDTO } from "../../../model/dto/user-account-dto";
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { StatisticsTableSource } from "../statistics-table-source";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('paginator', {read: TemplateRef})
  paginator: TemplateRef<any>;

  viewProxyShown: boolean;

  summationColumns: SummationColumn[];

  currentMode: SummationMode = SummationMode.PER_POSITION;

  paginatorMode: 'single' | 'range' = 'single';

  tableData: TableData;

  private userAccount: UserAccountDTO;
  private enterpriseId: number;
  private departmentId: number;

  private dataSub: Subscription;
  private routeSub: Subscription;

  constructor(private tableSource: StatisticsTableSource,
              private cd: ChangeDetectorRef,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private templateService: ToolbarTemplateService) { }

  ngOnInit() {
    this.userAccount = this.authService.currentUserAccount;
    this.enterpriseId = this.userAccount.enterpriseId;

    this.routeSub = this.activatedRoute.params.pipe(
      map(value => value.departmentId),
      filter(departmentId => departmentId)
    ).subscribe(departmentId => {
      this.departmentId = departmentId;

      this.refresh(this.userAccount);
    });
  }

  private refresh(userAccount: UserAccountDTO) {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }

    this.dataSub = this.tableSource.getTableData(userAccount, this.enterpriseId, this.departmentId, this.currentMode)
      .subscribe((tableData) => {
        this.viewProxyShown = false;

        this.summationColumns = this.tableSource.summationColumns;
        this.tableData = tableData;
        this.cd.detectChanges();
      });
  }

  ngAfterViewInit() {
    this.templateService.changeTemplate(this.paginator);
  }

  ngOnDestroy(): void {
    this.templateService.changeTemplate(null);
    this.dataSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  getEmployeeShortName(employee: Employee): string {
    return getEmployeeShortName(employee);
  }

  onDateChange() {
    this.viewProxyShown = true;
    this.cd.detectChanges();
  }

  changeMode() {
    if (this.currentMode == SummationMode.PER_POSITION) {
      this.currentMode = SummationMode.OVERALL;
    } else {
      this.currentMode = SummationMode.PER_POSITION;
    }

    this.viewProxyShown = true;
    this.cd.detectChanges();

    if (this.dataSub) this.dataSub.unsubscribe();
    this.refresh(this.userAccount);
  }

  changePaginatorMode() {
    if (this.paginatorMode === 'single') {
      this.paginatorMode = 'range';
    } else {
      this.paginatorMode = 'single';
    }
  }
}
