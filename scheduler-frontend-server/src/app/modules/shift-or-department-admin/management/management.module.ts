import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ManagementComponent } from './management/management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { EmployeesModule } from './components/employees/employees.module';
import { PositionsModule } from './components/positions/positions.module';
import { ShiftsModule } from './components/shifts/shifts.module';
import { PatternsModule } from './components/patterns/patterns.module';
import { RemoveDialogModule } from "../../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { WorkingTimeModule } from "../schedule/components/working-time/working-time.module";
import { DepartmentDayTypesModule } from "./components/department-day-types/department-day-types.module";
import { AvrSideBarModule } from "../../../lib/avr-side-bar/avr-side-bar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AvrSideBarModule,
    EmployeesModule,
    PositionsModule,
    DepartmentDayTypesModule,
    ShiftsModule,
    PatternsModule,
    WorkingTimeModule,
    MatSidenavModule,
    ManagementRoutingModule,
    RemoveDialogModule
  ],
  declarations: [
    ManagementComponent
  ],
  providers: []
})
export class ManagementModule {}
