import { NgModule } from "@angular/core";
import { UserAccountsTableComponent } from './user-accounts-table/user-accounts-table.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../../../../shared/shared.module";
import { ShiftUserAccountService } from "../../../../services/http/auth/shift-user-account.service";
import { AddShiftUserAccountDialogComponent } from './add-shift-user-account-dialog/add-shift-user-account-dialog.component';
import { EditShiftUserAccountDialogComponent } from './edit-shift-user-account-dialog/edit-shift-user-account-dialog.component';
import { ResetUserAccountPasswordDialogModule } from "../../../user-account-password/reset-user-account-password-dialog/reset-user-account-password-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ResetUserAccountPasswordDialogModule
  ],
  declarations: [
    UserAccountsTableComponent,
    AddShiftUserAccountDialogComponent,
    EditShiftUserAccountDialogComponent
  ],
  providers: [
    ShiftUserAccountService
  ]
})
export class ShiftAdminUserAccountsModule {}
