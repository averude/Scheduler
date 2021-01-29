import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from "./components/employees/components/employees-table/employees-table.component";
import { PositionsTableComponent } from "./components/positions/components/positions-table/positions-table.component";
import { PatternsTableComponent } from "./components/patterns/components/patterns-table/patterns-table.component";
import { ShiftsTableComponent } from "./components/shifts/components/shifts-table/shifts-table.component";
import { ManagementComponent } from "./management/management.component";
import { DepartmentDayTypesTableComponent } from "./components/department-day-types/components/department-day-types-table/department-day-types-table.component";
import { UserAccountsTableComponent } from "./components/shift-admin-user-accounts/components/user-accounts-table/user-accounts-table.component";
import { MainShiftCompositionTableComponent } from "./components/main-shift-composition/components/main-shift-composition-table/main-shift-composition-table.component";
import { SubstitutionShiftCompositionTableComponent } from "./components/substitution-shift-composition/components/substitution-shift-composition-table/substitution-shift-composition-table.component";
import { ReportSheetTableComponent } from "./components/report-sheets/report-sheet-table/report-sheet-table.component";

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'shift_admin_user_accounts',
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
      },
      {
        path: 'main_compositions',
        component: MainShiftCompositionTableComponent
      },
      {
        path: 'substitution_compositions',
        component: SubstitutionShiftCompositionTableComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
