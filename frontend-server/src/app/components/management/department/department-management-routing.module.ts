import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from "./employees/employees-table/employees-table.component";
import { PositionsTableComponent } from "./positions/positions-table/positions-table.component";
import { PatternsTableComponent } from "./patterns/patterns-table/patterns-table.component";
import { ShiftsTableComponent } from "./shifts/shifts-table/shifts-table.component";
import { DepartmentManagementComponent } from "./department-management.component";
import { DepartmentDayTypesTableComponent } from "./department-day-types/department-day-types-table/department-day-types-table.component";
import { UserAccountsTableComponent } from "./shift-admin-user-accounts/user-accounts-table/user-accounts-table.component";
import { ReportSheetTableComponent } from "./report-sheets/report-sheet-table/report-sheet-table.component";

const routes: Routes = [
  {
    path: '',
    component: DepartmentManagementComponent,
    children: [
      {
        path: 'shift_user_accounts',
        component: UserAccountsTableComponent
      },
      {
        path: 'employees',
        component: EmployeesTableComponent
      },
      {
        path: 'positions',
        component: PositionsTableComponent
      },
      {
        path: 'department_day_types',
        component: DepartmentDayTypesTableComponent
      },
      {
        path: 'patterns',
        component: PatternsTableComponent
      },
      {
        path: 'sub_departments',
        component: ReportSheetTableComponent
      },
      {
        path: 'shifts',
        component: ShiftsTableComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentManagementRoutingModule {}
