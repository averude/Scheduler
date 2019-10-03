import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import * as fileSaver from 'file-saver';
import { MatDatepicker } from "@angular/material";
import { ReportService } from "../../../../../services/report.service";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  date: Moment;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.date = moment.utc();
  }

  chosenMonthHandler(selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    this.date = selectedDate.clone();
    datepicker.close();
  }

  generateAndSaveReport() {
    const from = this.date.clone().startOf('month').format('YYYY-MM-DD');
    const to   = this.date.clone().endOf('month').format('YYYY-MM-DD');
    this.reportService.getReport(from, to)
      .subscribe(report => fileSaver.saveAs(report.body, `schedule_${from}_${to}.xls`));
  }
}
