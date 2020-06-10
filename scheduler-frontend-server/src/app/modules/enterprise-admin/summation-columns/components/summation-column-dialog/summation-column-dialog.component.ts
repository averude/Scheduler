import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DayType } from "../../../../../model/day-type";
import { SummationColumn } from "../../../../../model/summation-column";
import { SummationColumnDayTypeRange } from "../../../../../model/summation-column-day-type-range";
import { DtoDialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dto-dialog-base.component";
import { AuthService } from "../../../../../services/http/auth.service";
import { BasicDto } from "../../../../../model/dto/basic-dto";

@Component({
  selector: 'app-summation-column-dialog',
  templateUrl: './summation-column-dialog.component.html',
  styleUrls: ['./summation-column-dialog.component.css']
})
export class SummationColumnDialogComponent extends DtoDialogBaseComponent<SummationColumn, SummationColumnDayTypeRange> {

  dayTypes: DayType[];

  constructor(private authService: AuthService,
              dialogRef: MatDialogRef<SummationColumnDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);
    this.dayTypes = data.dayTypes ? data.dayTypes : [];
  }


  get newDto(): BasicDto<SummationColumn, SummationColumnDayTypeRange> {
    let newDto = super.newDto;
    newDto.parent.onlyHolidays = false;
    return newDto;
  }
}
