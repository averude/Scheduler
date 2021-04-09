import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DepartmentManagementComponent } from './department-management.component';
import { DepartmentManagementRoutingModule } from './department-management-routing.module';
import { EmployeesModule } from './employees/employees.module';
import { PositionsModule } from './positions/positions.module';
import { ShiftsModule } from './shifts/shifts.module';
import { PatternsModule } from './patterns/patterns.module';
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { WorkingNormModule } from "../working-norm/working-norm.module";
import { DepartmentDayTypesModule } from "./department-day-types/department-day-types.module";
import { AvrSideBarModule } from "../../lib/avr-side-bar/avr-side-bar.module";
import { ShiftAdminUserAccountsModule } from "./shift-admin-user-accounts/shift-admin-user-accounts.module";
import { ReportSheetModule } from "./report-sheets/report-sheet.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AvrSideBarModule,
    EmployeesModule,
    PositionsModule,
    DepartmentDayTypesModule,
    ReportSheetModule,
    ShiftsModule,
    ShiftAdminUserAccountsModule,
    PatternsModule,
    WorkingNormModule,
    MatSidenavModule,
    DepartmentManagementRoutingModule,
    RemoveDialogModule
  ],
  declarations: [
    DepartmentManagementComponent
  ],
  providers: []
})
export class DepartmentManagementModule {}
