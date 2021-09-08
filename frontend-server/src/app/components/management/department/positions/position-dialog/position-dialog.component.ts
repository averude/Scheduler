import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Position } from "../../../../../model/position";
import { AuthService } from "../../../../../services/http/auth.service";
import { DialogBaseComponent } from "../../../../../shared/abstract-components/dialog-base/dialog-base.component";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['../../../../../shared/common/dialog.common.css', './position-dialog.component.css']
})
export class PositionDialogComponent extends DialogBaseComponent<Position>{

  private readonly departmentId: number;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<PositionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    super(data.position, dialogRef);
    this.departmentId = data.departmentId;
  }

  initTheForm() {
    this.dialogForm = this.fb.group({
      id:           [],
      departmentId: [this.departmentId],
      name:         ['', [Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(256)]],
      shortName:    [null,[Validators.minLength(1),
                           Validators.maxLength(64)]],
      uiPriority:   [0]
    });
  }

  fillInTheForm(position: Position) {
    this.dialogForm.setValue({
      id:           position.id,
      departmentId: position.departmentId,
      name:         position.name,
      shortName:    position.shortName,
      uiPriority:   position.uiPriority
    });
  }
}
