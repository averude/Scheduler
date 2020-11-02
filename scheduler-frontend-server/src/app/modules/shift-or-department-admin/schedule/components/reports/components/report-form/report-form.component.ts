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

  summationColumns: SummationColumn[] = [];
  selectedSummationColumns: SummationColumn[] = [];

  constructor(private fb: FormBuilder,
              private reportService: ReportService,
              private summationColumnDtoService: SummationColumnDtoService) { }

  ngOnInit() {
    this.summationColumnDtoService.getAll()
      .subscribe(dtos => {
        this.summationColumns = dtos.map(value => value.parent);
        this.summationColumns.push({
          id: -1,
          name: 'Норма'
        } as SummationColumn);
        this.summationColumns.push({
          id: -2,
          name: 'Норма явок'
        } as SummationColumn);
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
      ])
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
      .generateReport(this.reportType, this.date, this.decorationDataForm.value, this.selectedSummationColumns)
      .subscribe(buffer => fileSaver.saveAs(new Blob([buffer]), reportName));
  }
}
