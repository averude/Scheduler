import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Position } from "../../../../../../../model/position";
import { AuthService } from "../../../../../../../http-services/auth.service";
import { DialogBaseComponent } from "../../../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['../../../../../../../shared/common/dialog.common.css', './position-dialog.component.css']
})
export class PositionDialogComponent extends DialogBaseComponent<Position>{

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<PositionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.position, dialogRef);
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id: [],
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(64)]],
      shortName: [null,[Validators.minLength(1),
                        Validators.maxLength(20)]],
      departmentId: [this.tempMethod(), [Validators.required]]
    });
  }

  fillInTheForm(position: Position) {
    this.dialogForm.setValue({
      id: position.id,
      name: position.name,
      shortName: position.shortName,
      departmentId: position.departmentId
    })
  }

  tempMethod(): number {
    let user = this.authService.currentUserValue;
    return user ? user.departmentId : 1;
  }
}
