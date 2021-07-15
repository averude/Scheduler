import { DepartmentsTableComponent } from "./departments/departments-table/departments-table.component";
import { DayTypesTableComponent } from "./daytypes/daytypes-table/daytypes-table.component";
import { SummationColumnsTableComponent } from "./summation-columns/summation-columns-table/summation-columns-table.component";
import { UserAccountsTableComponent } from "./department-admin-user-accounts/user-accounts-table/user-accounts-table.component";
import { SpecialCalendarDatesTableComponent } from "./special-calendar-dates/special-calendar-dates-table/special-calendar-dates-table.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EnterpriseManagementComponent } from "./enterprise-management.component";
import { WorkScheduleViewsTableComponent } from "./work-schedule-views/work-schedule-views-table/work-schedule-views-table.component";

const routes = [
  {
    path: '',
    component: EnterpriseManagementComponent,
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
      },
      {
        path: 'work_schedule_views',
        component: WorkScheduleViewsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseManagementRoutingModule {
}
