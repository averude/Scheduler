import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import * as fileSaver from 'file-saver';
import { MatDatepicker } from "@angular/material/datepicker";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SummationColumn } from "../../../model/summation-column";
import { SummationColumnDtoService } from "../../../services/http/summation-column-dto.service";
import { SCHEDULE_REPORT, TIME_SHEET_REPORT } from "../model/report-types";
import { StatisticsColumnCompositor } from "../../../shared/compositor/statistics-column-compositor";
import { AuthService } from "../../../services/http/auth.service";
import { UserAccessRights } from "../../../model/user";
import { ActivatedRoute } from "@angular/router";
import { ReportDataSource } from "../data-source/report-data-source";
import { ReportService } from "../report.service";
import { ScheduleTablePaginationStrategy } from "../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-report-generator-form',
  templateUrl: './report-generator-form.component.html',
  styleUrls: ['./report-generator-form.component.css']
})
export class ReportGeneratorFormComponent implements OnInit {

  isAble: boolean = false;

  userAccessRights: UserAccessRights;

  reportTypes = [SCHEDULE_REPORT, TIME_SHEET_REPORT];

  reportType: string;
  decorationDataForm: FormGroup;

  date: Moment;

  summationColumns: SummationColumn[] = [];
  selectedSummationColumns: SummationColumn[] = [];

  normCols: SummationColumn[] = [];
  useReportLabel: boolean;

  private departmentId: number;

  splitIntoSheets: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private paginationStrategy: ScheduleTablePaginationStrategy,
              private reportDataSource: ReportDataSource,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private reportService: ReportService,
              private summationColumnDtoService: SummationColumnDtoService) { }

  private enterpriseId: number;

  ngOnInit() {
    this.userAccessRights = this.authService.currentUserValue.accessRights;

    this.enterpriseId = this.authService.currentUserAccount.enterpriseId;
    this.departmentId = this.activatedRoute.snapshot.params.departmentId;

    this.summationColumnDtoService.getAllByEnterpriseId(this.enterpriseId)
      .subscribe(dtos => {
        this.summationColumns = dtos.map(value => value.parent);

        this.statisticsColumnCompositor.composeColumns(this.normCols);
        this.statisticsColumnCompositor.composeColumns(this.summationColumns);
      });

    this.date = moment.utc();

    this.decorationDataForm = this.fb.group({
      year:                 [this.date.year()],
      month:                [this.date.clone().locale('uk-UA').format("MMMM")],
      agreed:               this.createSection('Погоджено'),
      approved:             this.createSection('ЗАТВЕРДЖУЮ'),
    });

    this.setIsAble();
  }

  private createSection(label: string) {
    return this.fb.group({
      label:              [label],
      year:               [this.date.year()],
    });
  }

  moveToSelected(selected) {
    if (selected) {
      let index = this.summationColumns.findIndex(value => value === selected);
      this.summationColumns.splice(index, 1);
      this.selectedSummationColumns.push(selected);
    }
  }

  moveToList(selected) {
    if (selected) {
      let index = this.selectedSummationColumns.findIndex(value => value === selected);
      this.selectedSummationColumns.splice(index, 1);
      this.summationColumns.push(selected);
    }
  }

  moveAllToSelected() {
    while (this.summationColumns.length > 0) {
      this.selectedSummationColumns.push(this.summationColumns.shift());
    }
  }

  moveAllToList() {
    while (this.selectedSummationColumns.length > 0) {
      this.summationColumns.push(this.selectedSummationColumns.shift());
    }
  }

  chosenMonthHandler(selectedDate: Moment, datepicker: MatDatepicker<Moment>) {
    this.date = selectedDate.clone();

    this.decorationDataForm.patchValue({
      year: this.date.year(),
      month: this.date.clone().locale('uk-UA').format("MMMM")
    });
    datepicker.close();
  }

  generateReport() {
    const reportName = `${this.reportType}-report-${this.date.format("MM-YYYY")}.xlsx`;

    const from = this.date.clone().startOf('month').format('YYYY-MM-DD');
    const to   = this.date.clone().endOf('month').format('YYYY-MM-DD');

    const reportDataObservable = this.getReportDataObservable(from, to)
      .pipe(tap(data => data.calendarDays = this.paginationStrategy
        .calcDaysInMonth(this.date, data.specialCalendarDates)));

    this.reportService.generate(reportDataObservable,
      this.decorationDataForm.value, this.reportType,
      {useReportLabel: this.useReportLabel, divideBySubDep: this.splitIntoSheets},
      this.selectedSummationColumns
    ).subscribe(buffer => fileSaver.saveAs(new Blob([buffer]), reportName));
  }

  getReportDataObservable(from: string, to: string) {
    if (this.userAccessRights.isShiftLevel) {
      const shiftIds = this.authService.currentUserAccount.shiftIds;
      return this.reportDataSource
        .getForShifts(this.enterpriseId, this.departmentId, shiftIds, from, to);
    } else {
      return this.reportDataSource
        .getForDepartment(this.enterpriseId, this.departmentId, from, to);
    }
  }

  setIsAble() {
    this.isAble = this.userAccessRights?.isDepartmentLevel || this.userAccessRights?.isEnterpriseLevel;
  }
}
