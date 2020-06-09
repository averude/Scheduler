import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DayTypesModule } from "./daytypes/daytypes.module";
import { DepartmentsModule } from "./departments/departments.module";
import { SummationColumnsModule } from "./summation-columns/summation-columns.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { NgxMaskModule } from "ngx-mask";
import { EnterpriseAdminRoutingModule } from "./enterprise-admin-routing.module";
import { ExtraWeekendsModule } from "./extra-weekends/extra-weekends.module";
import { ExtraWorkdaysModule } from "./extra-workdays/extra-workdays.module";
import { HolidaysModule } from "./holidays/holidays.module";
import { EnterpriseAdminComponent } from "./enterprise-admin/enterprise-admin.component";
import { DepartmentAdminUserAccountsModule } from "./department-admin-user-accounts/department-admin-user-accounts.module";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { AvrTopBarModule } from "../../lib/avr-top-bar/avr-top-bar.module";
import { AvrSideBarModule } from "../../lib/avr-side-bar/avr-side-bar.module";

@NgModule({
  imports: [
    CommonModule,
    AvrTopBarModule,
    AvrSideBarModule,
    EnterpriseAdminRoutingModule,
    DayTypesModule,
    DepartmentsModule,
    SummationColumnsModule,
    ExtraWeekendsModule,
    ExtraWorkdaysModule,
    HolidaysModule,
    DepartmentAdminUserAccountsModule,
    RemoveDialogModule,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [EnterpriseAdminComponent]
})
export class EnterpriseAdminModule {}
