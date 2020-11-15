import { NgModule } from "@angular/core";
import { UserAccountsTableComponent } from './components/user-accounts-table/user-accounts-table.component';
import { UserAccountsDialogComponent } from './components/user-accounts-dialog/user-accounts-dialog.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../../../../../shared/shared.module";

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
    UserAccountsDialogComponent
  ]
})
export class ShiftAdminUserAccountsModule {}
