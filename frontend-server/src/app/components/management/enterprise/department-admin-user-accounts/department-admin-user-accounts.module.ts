import { NgModule } from "@angular/core";
import { UserAccountsTableComponent } from './user-accounts-table/user-accounts-table.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../shared/shared.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { DepartmentUserAccountService } from "../../../../services/http/auth/department-user-account.service";
import { AddDepartmentUserAccountDialogComponent } from './add-department-user-account-dialog/add-department-user-account-dialog.component';
import { EditDepartmentUserAccountDialogComponent } from './edit-department-user-account-dialog/edit-department-user-account-dialog.component';
import { ResetUserAccountPasswordDialogModule } from "../../../reset-user-account-password-dialog/reset-user-account-password-dialog.module";

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
    AddDepartmentUserAccountDialogComponent,
    EditDepartmentUserAccountDialogComponent
  ],
  providers: [
    DepartmentUserAccountService
  ]
})
export class DepartmentAdminUserAccountsModule {}
