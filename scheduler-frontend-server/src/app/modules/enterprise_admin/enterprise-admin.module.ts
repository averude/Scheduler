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
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { DepartmentAdminUserAccountsModule } from "./department-admin-user-accounts/department-admin-user-accounts.module";

@NgModule({
  imports: [
    CommonModule,
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
  declarations: [TopbarComponent, SidebarComponent]
})
export class EnterpriseAdminModule {}
