import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";
import { ShiftService } from "../../../../../../http-services/shift.service";
import { ShiftCompositionService } from "../../../../../../http-services/shift-composition.service";
import { ScheduleService } from "../../../../../../http-services/schedule.service";
import { WorkingTimeService } from "../../../../../../http-services/working-time.service";
import { forkJoin, Subscription } from "rxjs";
import { RowGroupCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-group-collector";
import { SchedulerRowGroupCollector } from "../collectors/scheduler-row-group-collector";
import { RowCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-collector";
import { SchedulerRowCollector } from "../collectors/scheduler-row-collector";
import { TableRenderer } from "../../../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { roundToTwo } from "../../../../../../shared/utils/utils";
import { calculateWorkHoursByWorkDay } from "../../../../../../shared/utils/time-converter";

@Component({
  selector: 'app-scheduler-table-component',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerTableComponent implements OnInit, OnDestroy {

  rowGroupCollector:  RowGroupCollector<any>;
  rowCollector:       RowCollector<any, any>;

  paginatorSub: Subscription;

  constructor(private cd: ChangeDetectorRef,
              private paginationService: PaginationService,
              private rowRenderer: TableRenderer,
              private shiftService: ShiftService,
              private shiftCompositionService: ShiftCompositionService,
              private scheduleService: ScheduleService,
              private workingTimeService: WorkingTimeService) { }

  ngOnInit() {
    this.uploadData();
  }

  ngOnDestroy(): void {
    this.paginationService.clearStoredValue();
    this.paginatorSub.unsubscribe();
  }

  private uploadData() {
    this.shiftService.getAllByAuth()
      .subscribe(shifts => {
        this.paginatorSub = this.paginationService.onValueChange.subscribe(daysInMonth => {
          forkJoin([
            this.shiftCompositionService.getAllByAuth(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.scheduleService.getAllByDate(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString),
            this.workingTimeService.getAllByAuth(
              daysInMonth[0].isoString,
              daysInMonth[daysInMonth.length - 1].isoString)
          ]).subscribe((values: any[][]) => {
            this.rowGroupCollector = new SchedulerRowGroupCollector(shifts, values[2]);
            this.rowCollector = new SchedulerRowCollector(values[1], values[0]);
            this.cd.markForCheck();
          })
        })
      });
  }

  // Rewrite
  calculateSum(rowData: any) {
    rowData.sum = rowData.workDays
      .map(workDay => calculateWorkHoursByWorkDay(workDay))
      .reduce((prev, curr) => prev + curr, 0);
    return rowData.sum;
  }

  calculateDiff(rowData: any) {
    return roundToTwo(rowData.timeNorm - rowData.sum);
  }
}
