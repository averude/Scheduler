import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';

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
