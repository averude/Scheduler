import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DayType } from "../../../../model/day-type";
import { SUMMATION_COLUMN_TYPES, SummationColumn } from "../../../../model/summation-column";
import { SummationColumnDayTypeRange } from "../../../../model/summation-column-day-type-range";
import { DtoDialogBaseComponent } from "../../../../shared/abstract-components/dialog-base/dto-dialog-base.component";
import { AuthService } from "../../../../services/http/auth.service";
import { BasicDTO } from "../../../../model/dto/basic-dto";
import { SPECIAL_CALENDAR_DATE_TYPES } from "../../../../model/special-calendar-date";

@Component({
  selector: 'app-summation-column-dialog',
  templateUrl: './summation-column-dialog.component.html',
  styleUrls: ['./summation-column-dialog.component.css']
})
export class SummationColumnDialogComponent extends DtoDialogBaseComponent<SummationColumn, SummationColumnDayTypeRange> {

  enterpriseId: number;

  dayTypes: DayType[];

  columnTypes:  string[] = SUMMATION_COLUMN_TYPES;
  dateTypes:    string[] = SPECIAL_CALENDAR_DATE_TYPES;

  constructor(private authService: AuthService,
              dialogRef: MatDialogRef<SummationColumnDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.enterpriseId = data.enterpriseId;
    this.dayTypes = data.dayTypes ? data.dayTypes : [];
  }

  get newDto(): BasicDTO<SummationColumn, SummationColumnDayTypeRange> {
    let newDto = super.newDto;
    newDto.parent.enterpriseId = this.enterpriseId;
    newDto.parent.onlyHolidays = false;
    return newDto;
  }
}
