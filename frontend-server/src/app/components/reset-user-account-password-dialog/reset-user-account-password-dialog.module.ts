import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetUserAccountPasswordDialogComponent } from "./reset-user-account-password-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [
    ResetUserAccountPasswordDialogComponent
  ]
})
export class ResetUserAccountPasswordDialogModule { }
