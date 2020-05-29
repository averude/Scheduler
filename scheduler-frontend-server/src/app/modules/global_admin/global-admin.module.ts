import { NgModule } from "@angular/core";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { CommonModule } from "@angular/common";
import { DepartmentsModule } from "../enterprise_admin/departments/departments.module";
import { GlobalAdminRoutingModule } from "./global-admin-routing.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { EnterpriseAdminUserAccountsModule } from "./enterprise-admin-user-accounts/enterprise-admin-user-accounts.module";
import { DayTypeGroupsModule } from "./day-type-groups/day-type-groups.module";
import { DayTypesModule } from "../enterprise_admin/daytypes/daytypes.module";
import { EnterprisesModule } from "./enterprises/enterprises.module";
import { SummationColumnsModule } from "../enterprise_admin/summation-columns/summation-columns.module";
import { NgxMaskModule } from "ngx-mask";
import { TopbarComponent } from "./topbar/topbar.component";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { RemoveDialogComponent } from "../../shared/abstract-components/remove-dialog/remove-dialog.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  imports: [
    CommonModule,
    GlobalAdminRoutingModule,
    EnterpriseAdminUserAccountsModule,
    DayTypesModule,
    EnterprisesModule,
    DepartmentsModule,
    DayTypeGroupsModule,
    SummationColumnsModule,
    RemoveDialogModule,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [GlobalAdminComponent, TopbarComponent, SidebarComponent],
  entryComponents: [RemoveDialogComponent]
})
export class GlobalAdminModule {}
