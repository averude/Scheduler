import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Moment } from "moment";
import * as fileSaver from 'file-saver';
import { MatDatepicker } from "@angular/material/datepicker";
import { ReportService } from "../../../../../../../services/generators/report/report.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SummationColumn } from "../../../../../../../model/summation-column";
import { SummationColumnDtoService } from "../../../../../../../services/http/summation-column-dto.service";
import { SCHEDULE_REPORT, TIME_SHEET_REPORT } from "../../../../../../../services/generators/report/model/report-types";
import { StatisticsColumnCompositor } from "../../../../../../../shared/compositor/statistics-column-compositor";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  reportTypes = [SCHEDULE_REPORT, TIME_SHEET_REPORT];
  reportType: string;

  decorationDataForm: FormGroup;
  date: Moment;

  splitIntoSheets: boolean = false;

  summationColumns: SummationColumn[] = [];
  selectedSummationColumns: SummationColumn[] = [];

  normCols: SummationColumn[] = [];

  useReportLabel: boolean;

  constructor(private fb: FormBuilder,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private reportService: ReportService,
              private summationColumnDtoService: SummationColumnDtoService) { }

  ngOnInit() {
    this.summationColumnDtoService.getAll()
      .subscribe(dtos => {
        this.summationColumns = dtos.map(value => value.parent);

        this.statisticsColumnCompositor.composeColumns(this.normCols);
        this.statisticsColumnCompositor.composeColumns(this.summationColumns);
      });

    this.date = moment.utc();

    this.decorationDataForm = this.fb.group({
      agreedPerson:         [],
      agreedPosition:       [],
      year:                 [this.date.year()],
      month:                [this.date.clone().locale('uk-UA').format("MMMM")],
      approvedPosition:     [],
      approvedPerson:       [],
      schedAndServiceName:  [null, [Validators.required]],
      documentCreators:     this.fb.array([
        this.createDocumentCreator()
      ]),
      agreed:               this.createSection('Погоджено'),
      approved:             this.createSection('ЗАТВЕРДЖУЮ'),
    });
  }

  private createSection(label: string) {
    return this.fb.group({
      label:              [label],
      position:           [],
      person:             [],
      year:               [this.date.year()],
    });
  }

  private createDocumentCreator() {
    return this.fb.group({
      position: [],
      name:     []
    });
  }

  get documentCreators(): FormArray {
    return this.decorationDataForm.get('documentCreators') as FormArray;
  }

  addDocumentCreator() {
    this.documentCreators.push(this.createDocumentCreator());
  }

  removeDocumentCreator(index: number) {
    this.documentCreators.removeAt(index);
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
    this.reportService
      .generateReport(this.reportType, this.date, this.decorationDataForm.value, this.selectedSummationColumns, this.useReportLabel, this.splitIntoSheets)
      .subscribe(buffer => fileSaver.saveAs(new Blob([buffer]), reportName));
  }
}
