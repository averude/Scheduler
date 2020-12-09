import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { ScheduleService } from "../../../../../../services/http/schedule.service";
import { from, Subscription } from "rxjs";
import { ScheduleTablePaginationStrategy } from "../../../../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { SchedulerCellLabelSetter } from "../utils/scheduler-cell-label-setter";
import { ShiftGenerationUnit } from "../../../../../../model/ui/shift-generation-unit";
import { toGenerationDto } from "../../../../../../lib/avr-entity-generation/util/utils";
import { NotificationsService } from "angular2-notifications";
import { concatMap } from "rxjs/operators";
import { TableRenderer } from "../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableSumCalculator } from "../../../../../../services/calculators/table-sum-calculator.service";
import { AuthService } from "../../../../../../services/http/auth.service";
import { TableDataSource } from "../collectors/table-data-source";
import { SchedulerUtility } from "../utils/scheduler-utility";

@Component({
  selector: 'app-schedule-table-component',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;

  units: ShiftGenerationUnit[];

  tableData: RowGroupData[];

  private dataSourceSub: Subscription;
  private rowRenderSub: Subscription;

  constructor(private authService: AuthService,
              private cd: ChangeDetectorRef,
              public  cellLabelSetter: SchedulerCellLabelSetter,
              public  paginationStrategy: ScheduleTablePaginationStrategy,
              private paginationService: PaginationService,
              private tableRenderer: TableRenderer,
              private sumCalculator: TableSumCalculator,
              private scheduleService: ScheduleService,
              public dataSource: TableDataSource,
              public utility: SchedulerUtility,
              private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.dataSourceSub = this.dataSource.tableData
      .subscribe(tableData => {
        this.tableData = tableData;
        this.cd.markForCheck();
      });

    this.isAdmin = this.authService.isAdmin();

    this.rowRenderSub = this.tableRenderer.onRenderRow
      .subscribe(rowId => this.sumCalculator.calculateWorkHoursSum(this.tableData, rowId));
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
    if (this.dataSourceSub) this.dataSourceSub.unsubscribe();
  }

  onScheduleGenerate(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto => this.scheduleService.generate(generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}
