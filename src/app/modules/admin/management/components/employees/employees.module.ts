import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AddEmployeeComponent,
    EmployeesTableComponent
  ]
})
export class EmployeesModule {}
