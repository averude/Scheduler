import { NgModule } from "@angular/core";
import { UserAccountsTableComponent } from './components/user-accounts-table/user-accounts-table.component';
import { UserAccountsDialogComponent } from './components/user-accounts-dialog/user-accounts-dialog.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import {
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import { RemoveDialogComponent } from "../../../shared/abstract-components/remove-dialog/remove-dialog.component";

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
    RemoveDialogComponent
  ],
  entryComponents: [UserAccountsDialogComponent, RemoveDialogComponent]
})
export class AccountsModule {}
