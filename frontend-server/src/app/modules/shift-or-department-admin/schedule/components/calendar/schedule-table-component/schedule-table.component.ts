import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { ShiftService } from "../../../../../../services/http/shift.service";
import { MainShiftCompositionService } from "../../../../../../services/http/main-shift-composition.service";
import { ScheduleService } from "../../../../../../services/http/schedule.service";
import { WorkingNormService } from "../../../../../../services/http/working-norm.service";
import { forkJoin, from, Subscription } from "rxjs";
import { ScheduleTablePaginationStrategy } from "../../../../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { ScheduleTableDataCollector } from "../collectors/schedule-table-data-collector";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { SchedulerCellLabelSetter } from "../utils/scheduler-cell-label-setter";
import { ShiftGenerationUnit } from "../../../../../../model/ui/shift-generation-unit";
import { getGenerationUnits, toGenerationDto } from "../../../../../../lib/avr-entity-generation/util/utils";
import { NotificationsService } from "angular2-notifications";
import { concatMap } from "rxjs/operators";
import { TableRenderer } from "../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableSumCalculator } from "../../../../../../services/calculators/table-sum-calculator.service";
import { AuthService } from "../../../../../../services/http/auth.service";
import { SubstitutionShiftCompositionService } from "../../../../../../services/http/substitution-shift-composition.service";

@Component({
  selector: 'app-schedule-table-component',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;

  units: ShiftGenerationUnit[];

  rowGroupData: RowGroupData[];

  private paginatorSub: Subscription;
  private rowRenderSub: Subscription;

  constructor(private authService: AuthService,
              private cd: ChangeDetectorRef,
              public  cellLabelSetter: SchedulerCellLabelSetter,
              public  paginationStrategy: ScheduleTablePaginationStrategy,
              private paginationService: PaginationService,
              private tableRenderer: TableRenderer,
              private sumCalculator: TableSumCalculator,
              private shiftService: ShiftService,
              private mainShiftCompositionService: MainShiftCompositionService,
              private substitutionShiftCompositionService: SubstitutionShiftCompositionService,
              private scheduleService: ScheduleService,
              private workingNormService: WorkingNormService,
              private scheduleTableDataCollector: ScheduleTableDataCollector,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.uploadData();
    this.isAdmin = this.authService.isAdmin();

    this.rowRenderSub = this.tableRenderer.onRenderRow
      .subscribe(rowId => this.sumCalculator.calculateWorkHoursSum(this.rowGroupData, rowId));
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.paginatorSub) this.paginatorSub.unsubscribe();
    if (this.rowRenderSub) this.rowRenderSub.unsubscribe();
  }

  private uploadData() {
    this.shiftService.getAll()
      .subscribe(shifts => {
        this.units = getGenerationUnits(shifts);
        this.paginatorSub = this.paginationService.onValueChange.subscribe(daysInMonth => {
          forkJoin([
            this.mainShiftCompositionService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.substitutionShiftCompositionService
              .getAll(
                daysInMonth[0].isoString,
                daysInMonth[daysInMonth.length - 1].isoString),
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.workingNormService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString)
          ]).subscribe((values: any[][]) => {
            this.rowGroupData = this.scheduleTableDataCollector.getTableData(daysInMonth, shifts, values[0], values[1], values[2], values[3]);
            this.sumCalculator.calculateWorkHoursSum(this.rowGroupData);
            this.cd.markForCheck();
          })
        })
      });
  }

  onScheduleGenerate(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto => this.scheduleService.generate(generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}
