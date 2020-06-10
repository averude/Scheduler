import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { ExtraWorkDay } from "../../../../../model/extra-workday";
import { AuthService } from "../../../../../services/http/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-extra-workdays-dialog',
  templateUrl: './extra-workdays-dialog.component.html',
  styleUrls: ['./extra-workdays-dialog.component.css']
})
export class ExtraWorkdaysDialogComponent extends DialogBaseComponent<ExtraWorkDay> {

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ExtraWorkDay>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.extraWorkDay, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:             [],
      // departmentId:   this.authService.departmentId,
      extraWeekendId: [],
      date:           [null, [Validators.required]]
    });
  }

  fillInTheForm(extraWorkDay: ExtraWorkDay) {
    this.dialogForm.setValue({
      id:             extraWorkDay.id,
      // departmentId:   extraWorkDay.departmentId,
      extraWeekendId: extraWorkDay.extraWeekendId,
      date:           extraWorkDay.date
    });
  }
}
