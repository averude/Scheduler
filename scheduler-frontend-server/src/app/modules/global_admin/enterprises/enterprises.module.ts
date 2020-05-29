import { NgModule } from "@angular/core";
import { EnterprisesTableComponent } from './components/enterprises-table/enterprises-table.component';
import { EnterpriseDialogComponent } from './components/enterprise-dialog/enterprise-dialog.component';
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

@NgModule({
  imports: [CommonModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule],
  declarations: [EnterprisesTableComponent, EnterpriseDialogComponent],
  entryComponents: [EnterpriseDialogComponent]
})
export class EnterprisesModule {}
