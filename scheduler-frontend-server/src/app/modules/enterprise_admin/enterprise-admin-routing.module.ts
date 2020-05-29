import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DepartmentsTableComponent } from "./departments/components/departments-table/departments-table.component";
import { DayTypesTableComponent } from "./daytypes/components/daytypes-table/daytypes-table.component";
import { HolidaysTableComponent } from "./holidays/components/holidays-table/holidays-table.component";
import { ExtraWeekendsTableComponent } from "./extra-weekends/components/extra-weekends-table/extra-weekends-table.component";
import { ExtraWorkdaysTableComponent } from "./extra-workdays/components/extra-workdays-table/extra-workdays-table.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { UserAccountsTableComponent } from "./department-admin-user-accounts/components/user-accounts-table/user-accounts-table.component";
import { SummationColumnsTableComponent } from "./summation-columns/components/summation-columns-table/summation-columns-table.component";

const routes = [
  {
    path: '',
    component: TopbarComponent,
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
        path: 'holidays',
        component: HolidaysTableComponent
      },
      {
        path: 'extraweekends',
        component: ExtraWeekendsTableComponent
      },
      {
        path: 'extraworkdays',
        component: ExtraWorkdaysTableComponent
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
