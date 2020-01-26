import { Component, Inject } from '@angular/core';
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { Department } from "../../../../../model/department";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../../http-services/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css', './department-dialog.component.css']
})
export class DepartmentDialogComponent extends DialogBaseComponent<Department> {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<DepartmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.department, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:     [],
      name:   ['', [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(128)]]
    });
  }

  fillInTheForm(department: Department) {
    this.dialogForm.setValue({
      id:     department.id,
      name:   department.name
    });
  }
}
