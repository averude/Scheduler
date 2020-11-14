import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DayTypesModule } from "./daytypes/daytypes.module";
import { DepartmentsModule } from "./departments/departments.module";
import { SummationColumnsModule } from "./summation-columns/summation-columns.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { NgxMaskModule } from "ngx-mask";
import { EnterpriseAdminRoutingModule } from "./enterprise-admin-routing.module";
import { EnterpriseAdminComponent } from "./enterprise-admin/enterprise-admin.component";
import { DepartmentAdminUserAccountsModule } from "./department-admin-user-accounts/department-admin-user-accounts.module";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { AvrTopBarModule } from "../../lib/avr-top-bar/avr-top-bar.module";
import { AvrSideBarModule } from "../../lib/avr-side-bar/avr-side-bar.module";
import { SpecialCalendarDatesModule } from "./special-calendar-dates/special-calendar-dates.module";

@NgModule({
  imports: [
    CommonModule,
    AvrTopBarModule,
    AvrSideBarModule,
    EnterpriseAdminRoutingModule,
    DayTypesModule,
    DepartmentsModule,
    SummationColumnsModule,
    SpecialCalendarDatesModule,
    DepartmentAdminUserAccountsModule,
    RemoveDialogModule,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [EnterpriseAdminComponent]
})
export class EnterpriseAdminModule {}
