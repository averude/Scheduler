import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ExtraWeekend } from "../../../../../../../model/extra-weekend";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-extra-weekends-dialog',
  templateUrl: './extra-weekends-dialog.component.html',
  styleUrls: ['./extra-weekends-dialog.component.css']
})
export class ExtraWeekendsDialogComponent extends DialogBaseComponent<ExtraWeekend> {

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ExtraWeekend>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.extraWeekend, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      departmentId: this.authService.departmentId,
      holidayId:    [],
      date:         [null, [Validators.required]]
    });
  }

  fillInTheForm(extraWeekend: ExtraWeekend) {
    this.dialogForm.setValue({
      id:           extraWeekend.id,
      departmentId: extraWeekend.departmentId,
      holidayId:    extraWeekend.holidayId,
      date:         extraWeekend.date
    });
  }
}
