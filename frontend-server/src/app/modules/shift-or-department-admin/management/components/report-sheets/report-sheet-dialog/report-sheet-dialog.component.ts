import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ReportSheetDTO } from "../../../../../../model/dto/report-sheet-dto";
import { AuthService } from "../../../../../../services/http/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Shift } from "../../../../../../model/shift";

@Component({
  selector: 'app-report-sheet-dialog',
  templateUrl: './report-sheet-dialog.component.html',
  styleUrls: ['../../../../../../shared/common/dialog.common.css', './report-sheet-dialog.component.css']
})
export class ReportSheetDialogComponent extends DialogBaseComponent<ReportSheetDTO> {

  shifts: Shift[];

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ReportSheetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.dto, dialogRef);

    this.shifts = data.shifts;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      reportSheet: this.fb.group({
        id:   [],
        name: ['', Validators.required]
      }),
      shiftIds: [null, Validators.required]
    })
  }

  fillInTheForm(dto: ReportSheetDTO) {
    this.dialogForm.setValue({
      reportSheet: {
        id:   dto.reportSheet.id,
        name: dto.reportSheet.name
      },
      shiftIds:      dto.shiftIds,
    });
  }

}
