import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material';
import { ManagementComponent } from './management/management.component';
import { ManagementRoutingModule } from './management-routing.module';
import { EmployeesModule } from './components/employees/employees.module';
import { PositionsModule } from './components/positions/positions.module';
import { DayTypesModule } from './components/daytypes/daytypes.module';
import { ShiftsModule } from './components/shifts/shifts.module';
import { PatternsModule } from './components/patterns/patterns.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EmployeesModule,
    PositionsModule,
    DayTypesModule,
    ShiftsModule,
    PatternsModule,
    MatSidenavModule,
    ManagementRoutingModule
  ],
  declarations: [
    ManagementComponent
  ],
  providers: []
})
export class ManagementModule {}
