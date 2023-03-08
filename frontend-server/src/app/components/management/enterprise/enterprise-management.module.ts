import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AvrSideBarModule } from "../../../lib/avr-side-bar/avr-side-bar.module";
import { DayTypesModule } from "./daytypes/daytypes.module";
import { DepartmentAdminUserAccountsModule } from "./department-admin-user-accounts/department-admin-user-accounts.module";
import { DepartmentsModule } from "./departments/departments.module";
import { SpecialCalendarDatesModule } from "./special-calendar-dates/special-calendar-dates.module";
import { SummationColumnsModule } from "./summation-columns/summation-columns.module";
import { EnterpriseManagementRoutingModule } from "./enterprise-management-routing.module";
import { EnterpriseManagementComponent } from './enterprise-management.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AvrSideBarModule,
    DayTypesModule,
    DepartmentAdminUserAccountsModule,
    DepartmentsModule,
    SpecialCalendarDatesModule,
    SummationColumnsModule,
    EnterpriseManagementRoutingModule
  ],
  declarations: [
    EnterpriseManagementComponent
  ]
})
export class EnterpriseManagementModule {
}
