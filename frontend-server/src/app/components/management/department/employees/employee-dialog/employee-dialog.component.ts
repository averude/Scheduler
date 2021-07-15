import { Component, Inject } from '@angular/core';
import { Employee } from "../../../../../model/employee";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css', './employee-dialog.component.css']
})
export class EmployeeDialogComponent extends DialogBaseComponent<Employee> {

  private readonly departmentId: number;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<EmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.employee, dialogRef);
    this.departmentId = data.departmentId;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id: [],
      departmentId: [this.departmentId],
      firstName:  ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)]
      ],
      secondName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)]
      ],
      patronymic: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32)]
      ]
    });
  }

  fillInTheForm(employee: Employee) {
    this.dialogForm.setValue({
      id:           employee.id,
      departmentId: employee.departmentId,
      firstName:    employee.firstName,
      secondName:   employee.secondName,
      patronymic:   employee.patronymic
    });
  }
}
