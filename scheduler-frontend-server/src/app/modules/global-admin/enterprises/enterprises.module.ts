import { NgModule } from "@angular/core";
import { EnterprisesTableComponent } from './components/enterprises-table/enterprises-table.component';
import { EnterpriseDialogComponent } from './components/enterprise-dialog/enterprise-dialog.component';
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
  declarations: [EnterprisesTableComponent, EnterpriseDialogComponent]
})
export class EnterprisesModule {}
