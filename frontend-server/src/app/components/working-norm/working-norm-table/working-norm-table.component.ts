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
import { Subscription } from "rxjs";
import { WorkingNormService } from "../../../services/http/working-norm.service";
import { WorkingNormTableDataCollector } from "../collector/working-norm-table-data-collector";
import { ClearSelectionService } from "../../../lib/ngx-schedule-table/service/clear-selection.service";
import { SelectionEndService } from "../../../lib/ngx-schedule-table/service/selection-end.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { WorkingNormDialogComponent } from "../working-norm-dialog/working-norm-dialog.component";
import { SelectionData } from "../../../lib/ngx-schedule-table/model/selection-data";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableSumCalculator } from "../../../services/calculators/table-sum-calculator.service";
import { AuthService } from "../../../services/http/auth.service";
import { CellUpdater, getMonthCellIndex } from "../../../services/collectors/cell-updater";
import { ActivatedRoute } from "@angular/router";
import { Cell } from "../../../lib/ngx-schedule-table/model/data/cell";
import { WorkingNorm } from "../../../model/working-norm";
import { NotificationsService } from "angular2-notifications";
import { ToolbarTemplateService } from "../../../services/top-bar/toolbar-template.service";
import { filter, map, switchMap } from "rxjs/operators";
import { Options } from "../../../lib/ngx-schedule-table/model/options";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { WorkingNormDataSource } from "../data-source/working-norm.data-source";
import { WorkingNormInitialData } from "../../../model/datasource/initial-data";
import { PaginationService } from "../../../shared/paginators/pagination.service";

@Component({
  selector: 'app-working-norm-table',
  templateUrl: './working-norm-table.component.html',
  styleUrls: ['./working-norm-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkingNormTableComponent implements OnInit, AfterViewInit, OnDestroy {
  options: Options;

  isAdmin: boolean = false;
  proxyViewIsShown: boolean = false;

  enterpriseId: number;
  departmentId: number;

  initData: WorkingNormInitialData;
  tableData: TableData;

  @ViewChild('paginator', {read: TemplateRef})
  paginator: TemplateRef<any>;

  private routeSub:         Subscription;
  private selectionEndSub:  Subscription;
  private rowRenderSub:     Subscription;

  constructor(private cd: ChangeDetectorRef,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private templateService: ToolbarTemplateService,
              private dialog: MatDialog,
              private cellUpdater: CellUpdater,
              private rowClearSelection: ClearSelectionService,
              private selectionEndService: SelectionEndService,
              private tableRenderer: TableRenderer,
              private sumCalculator: TableSumCalculator,
              private dataSource: WorkingNormDataSource,
              private dataCollector: WorkingNormTableDataCollector,
              private paginationService: PaginationService,
              private workingNormService: WorkingNormService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.routeSub = this.activatedRoute.params.pipe(
      filter(value => value.departmentId),
      map(value => value.departmentId),
      switchMap(departmentId => {
        this.departmentId = Number.parseInt(departmentId);

        this.proxyViewIsShown = true;
        this.cd.detectChanges();

        if (this.departmentId && this.departmentId > 0) {
          return this.paginationService.onValueChange
            .pipe(
              switchMap(dateInterval => this.dataSource
                .byDepartmentId(this.departmentId, dateInterval.from, dateInterval.to)),
            )
        }
      })
    ).subscribe(initData => {
      this.proxyViewIsShown = false;
      this.initData = initData;
      this.tableData = this.dataCollector.getTableData(initData);
      this.sumCalculator.calculateTableHoursNormSum(this.tableData);
      this.cd.detectChanges();
    });

    if (this.isAdmin) {
      this.selectionEndSub = this.selectionEndService.onSelectionEnd
        .subscribe(selectionData => {
          if (selectionData.selectedCells && selectionData.selectedCells.length > 0) {
            this.openDialog(selectionData);
          }
        });
    }

    this.rowRenderSub = this.tableRenderer.onRowCommand()
      .subscribe(command => this.sumCalculator.calculateTableHoursNormSum(this.tableData, command.rowId));

    this.options = {
      groupable: false,
      selectionEnabled: !this.isAdmin,
      multipleSelect: false,
      showSumColumns: true,
      distinctByColor: true,
      trackByFn: (index: number, item: Cell) => {
        const value = <WorkingNorm> item.value;
        return `${value?.hours} + ${value?.days}`;
      }
    };
  }

  ngAfterViewInit() {
    this.templateService.changeTemplate(this.paginator);
  }

  ngOnDestroy() {
    this.templateService.changeTemplate(null);
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.selectionEndSub) this.selectionEndSub.unsubscribe();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
  }

  openDialog(selectionData: SelectionData) {
    const config = new MatDialogConfig();
    config.data = selectionData;
    config.hasBackdrop = true;

    this.dialog.open(WorkingNormDialogComponent, config)
      .afterClosed()
      .subscribe(workingNorm => {
        this.rowClearSelection.clearSelection();
        const onSuccess = res => {
          workingNorm = res;
          this.cellUpdater.updateCellData(selectionData.row.cells, [workingNorm], getMonthCellIndex);
          this.tableRenderer.nextRowCommand({rowId: selectionData.row.id});
          this.notificationsService.success('Success');
        };

        if (workingNorm) {
          workingNorm.departmentId = this.departmentId;
          if (workingNorm.id) {
            this.workingNormService.update(workingNorm)
              .subscribe(onSuccess);
          } else {

            this.workingNormService.create(workingNorm)
              .subscribe(onSuccess);
          }
        }
    });
  }

  onDateChange() {
    this.proxyViewIsShown = true;
    this.cd.detectChanges();
  }

  getCellValue(value): string {
    if (!value || (!value.hours && !value.days)) {
      return '-';
    } else {
      return value.hours + '/' + value.days;
    }
  }
}
