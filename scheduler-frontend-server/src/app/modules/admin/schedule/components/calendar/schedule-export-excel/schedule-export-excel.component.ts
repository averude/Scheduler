import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { ReportService } from "../../../../../../http-services/report.service";
import * as fileSaver from 'file-saver';
import { PaginationService } from "../../../../../../lib/ngx-schedule-table/service/pagination.service";

@Component({
  selector: 'app-schedule-export-excel',
  templateUrl: './schedule-export-excel.component.html',
  styleUrls: ['./schedule-export-excel.component.css']
})
export class ScheduleExportExcelComponent implements OnInit, OnDestroy {

  private paginatorSub: Subscription;
  private daysInMonth: CalendarDay[] = [];

  constructor(private paginatorService: PaginationService,
              private reportService: ReportService) { }

  ngOnInit() {
    this.paginatorSub = this.paginatorService.onValueChange
      .subscribe(daysInMonth => this.daysInMonth = daysInMonth);
  }

  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

  export() {
    if (this.daysInMonth && this.daysInMonth.length > 0){
      let from = this.daysInMonth[0].isoString;
      let to = this.daysInMonth[this.daysInMonth.length - 1].isoString;
      this.reportService.getReport(from, to)
        .subscribe(response => fileSaver.saveAs(response.body, `schedule_${from}_${to}.xls`));
    }
  }

}
