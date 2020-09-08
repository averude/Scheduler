import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DepartmentsTableComponent } from "./departments/components/departments-table/departments-table.component";
import { DayTypesTableComponent } from "./daytypes/components/daytypes-table/daytypes-table.component";
import { EnterpriseAdminComponent } from "./enterprise-admin/enterprise-admin.component";
import { UserAccountsTableComponent } from "./department-admin-user-accounts/components/user-accounts-table/user-accounts-table.component";
import { SummationColumnsTableComponent } from "./summation-columns/components/summation-columns-table/summation-columns-table.component";
import { SpecialCalendarDatesTableComponent } from "./special-calendar-dates/components/special-calendar-dates-table/special-calendar-dates-table.component";

const routes = [
  {
    path: '',
    component: EnterpriseAdminComponent,
    children: [
      {
        path: 'departments',
        component: DepartmentsTableComponent
      },
      {
        path: 'day_types',
        component: DayTypesTableComponent
      },
      {
        path: 'summation_columns',
        component: SummationColumnsTableComponent
      },
      {
        path: 'department_admin_user_accounts',
        component: UserAccountsTableComponent
      },
      {
        path: 'special_calendar_dates',
        component: SpecialCalendarDatesTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseAdminRoutingModule {
}
