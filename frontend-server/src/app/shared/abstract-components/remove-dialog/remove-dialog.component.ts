import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['../../common/dialog.common.css','./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {

  numberOfSelected: number;

  constructor(private dialogRef: MatDialogRef<RemoveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.numberOfSelected = data.numberOfSelected;
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
