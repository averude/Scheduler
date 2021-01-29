import { NgModule } from "@angular/core";
import { UserAccountsTableComponent } from './components/user-accounts-table/user-accounts-table.component';
import { UserAccountsDialogComponent } from './components/user-accounts-dialog/user-accounts-dialog.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { EnterpriseUserAccountService } from "../../../services/http/auth/enterprise-user-account.service";
import { AddEnterpriseUserAccountDialogComponent } from './components/add-enterprise-user-account-dialog/add-enterprise-user-account-dialog.component';
import { EditEnterpriseUserAccountDialogComponent } from './components/edit-enterprise-user-account-dialog/edit-enterprise-user-account-dialog.component';

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
    ReactiveFormsModule
  ],
  declarations: [
    UserAccountsTableComponent,
    UserAccountsDialogComponent,
    AddEnterpriseUserAccountDialogComponent,
    EditEnterpriseUserAccountDialogComponent
  ],
  providers: [
    EnterpriseUserAccountService
  ]
})
export class EnterpriseAdminUserAccountsModule {}
