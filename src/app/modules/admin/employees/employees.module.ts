import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [BrowserModule, FormsModule, SharedModule],
  declarations: [
    AddEmployeeComponent,
    EmployeesTableComponent
  ],
  exports: [
    AddEmployeeComponent,
    EmployeesTableComponent
  ],
  providers: []
})
export class EmployeesModule {}
