import { NgModule } from "@angular/core";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { CommonModule } from "@angular/common";
import { DepartmentsModule } from "./departments/departments.module";
import { GlobalAdminRoutingModule } from "./global-admin-routing.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { AccountsModule } from "./accounts/accounts.module";
import { DayTypeGroupsModule } from "./day-type-groups/day-type-groups.module";
import { DayTypesModule } from "./daytypes/daytypes.module";
import { EnterprisesModule } from "./enterprises/enterprises.module";

@NgModule({
 imports: [
   CommonModule,
   GlobalAdminRoutingModule,
   AccountsModule,
   DayTypesModule,
   EnterprisesModule,
   DepartmentsModule,
   DayTypeGroupsModule,
   SimpleNotificationsModule
 ],
 declarations: [GlobalAdminComponent]
})
export class GlobalAdminModule {}
