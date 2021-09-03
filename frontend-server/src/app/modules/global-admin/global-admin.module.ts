import { NgModule } from "@angular/core";
import { GlobalAdminComponent } from "./global-admin.component";
import { CommonModule } from "@angular/common";
import { AvrTopBarModule } from "../../lib/avr-top-bar/avr-top-bar.module";
import { AvrSideBarModule } from "../../lib/avr-side-bar/avr-side-bar.module";
import { GlobalAdminRoutingModule } from "./global-admin-routing.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { EnterpriseAdminUserAccountsModule } from "../../components/management/global/enterprise-admin-user-accounts/enterprise-admin-user-accounts.module";
import { DayTypeGroupsModule } from "../../components/management/global/day-type-groups/day-type-groups.module";
import { EnterprisesModule } from "../../components/management/global/enterprises/enterprises.module";
import { RemoveDialogModule } from "../../shared/abstract-components/remove-dialog/remove-dialog.module";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  imports: [
    CommonModule,
    AvrTopBarModule,
    AvrSideBarModule,
    GlobalAdminRoutingModule,
    EnterpriseAdminUserAccountsModule,
    EnterprisesModule,
    DayTypeGroupsModule,
    RemoveDialogModule,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [GlobalAdminComponent]
})
export class GlobalAdminModule {}
