import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { ShiftService } from "../../../../../../services/http/shift.service";
import { ShiftCompositionService } from "../../../../../../services/http/shift-composition.service";
import { ScheduleService } from "../../../../../../services/http/schedule.service";
import { WorkingTimeService } from "../../../../../../services/http/working-time.service";
import { forkJoin, from, Subscription } from "rxjs";
import { roundToTwo } from "../../../../../../shared/utils/utils";
import { calculateWorkHoursByWorkDay } from "../../../../../../shared/utils/time-converter";
import { ScheduleTablePaginationStrategy } from "../../../../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { ScheduleTableDataCollector } from "../collectors/schedule-table-data-collector";
import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { SchedulerCellLabelSetter } from "../utils/scheduler-cell-label-setter";
import { ShiftGenerationUnit } from "../../../../../../model/ui/shift-generation-unit";
import { getGenerationUnits, toGenerationDto } from "../../../../../../lib/avr-entity-generation/util/utils";
import { NotificationsService } from "angular2-notifications";
import { concatMap } from "rxjs/operators";

@Component({
  selector: 'app-scheduler-table-component',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerTableComponent implements OnInit, OnDestroy {

  units: ShiftGenerationUnit[];

  rowGroupData: RowGroupData[];

  paginatorSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              public cellLabelSetter: SchedulerCellLabelSetter,
              public paginationStrategy: ScheduleTablePaginationStrategy,
              private paginationService: PaginationService,
              private shiftService: ShiftService,
              private shiftCompositionService: ShiftCompositionService,
              private scheduleService: ScheduleService,
              private workingTimeService: WorkingTimeService,
              private scheduleTableDataCollector: ScheduleTableDataCollector,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.uploadData();
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    if (this.paginatorSub) this.paginatorSub.unsubscribe();
  }

  private uploadData() {
    this.shiftService.getAll()
      .subscribe(shifts => {
        this.units = getGenerationUnits(shifts);
        this.paginatorSub = this.paginationService.onValueChange.subscribe(daysInMonth => {
          forkJoin([
            this.shiftCompositionService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.workingTimeService.getAll(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString)
          ]).subscribe((values: any[][]) => {
            this.rowGroupData = this.scheduleTableDataCollector.getTableData(daysInMonth, shifts, values[0], values[1], values[2]);
            this.cd.markForCheck();
          })
        })
      });
  }

  calculateSum(rowData: any) {
    rowData.sum = rowData.cellData
      .map(cell => calculateWorkHoursByWorkDay(cell.value))
      .reduce((prev, curr) => prev + curr, 0);
    return rowData.sum;
  }

  calculateDiff(rowData: any) {
    return roundToTwo(rowData.timeNorm - rowData.sum);
  }

  onScheduleGenerate(generationUnits: ShiftGenerationUnit[]) {
    let dtos = generationUnits.map(unit => toGenerationDto(unit));

    from(dtos).pipe(
      concatMap(generationDto => this.scheduleService.generate(generationDto))
    ).subscribe(res => this.notificationsService.success('Generated', res));
  }
}
