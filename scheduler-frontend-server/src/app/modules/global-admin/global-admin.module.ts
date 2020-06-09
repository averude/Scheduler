import { NgModule } from "@angular/core";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { CommonModule } from "@angular/common";
import { AvrTopBarModule } from "../../lib/avr-top-bar/avr-top-bar.module";
import { AvrSideBarModule } from "../../lib/avr-side-bar/avr-side-bar.module";
import { DepartmentsModule } from "../enterprise-admin/departments/departments.module";
import { GlobalAdminRoutingModule } from "./global-admin-routing.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { EnterpriseAdminUserAccountsModule } from "./enterprise-admin-user-accounts/enterprise-admin-user-accounts.module";
import { DayTypeGroupsModule } from "./day-type-groups/day-type-groups.module";
import { DayTypesModule } from "../enterprise-admin/daytypes/daytypes.module";
import { EnterprisesModule } from "./enterprises/enterprises.module";
import { SummationColumnsModule } from "../enterprise-admin/summation-columns/summation-columns.module";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { NgxMaskModule } from "ngx-mask";
import { RemoveDialogComponent } from "../../shared/abstract-components/remove-dialog/remove-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    AvrTopBarModule,
    AvrSideBarModule,
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
  declarations: [GlobalAdminComponent],
  entryComponents: [RemoveDialogComponent]
})
export class GlobalAdminModule {}
