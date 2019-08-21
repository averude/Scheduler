import { NgModule } from "@angular/core";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { CommonModule } from "@angular/common";
import { DepartmentsModule } from "./departments/departments.module";
import { GlobalAdminRoutingModule } from "./global-admin-routing.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { OPTIONS } from "../admin/notification-options";
import { AccountsModule } from "./accounts/accounts.module";

@NgModule({
 imports: [
   CommonModule,
   GlobalAdminRoutingModule,
   AccountsModule,
   DepartmentsModule,
   SimpleNotificationsModule.forRoot(OPTIONS)
 ],
 declarations: [GlobalAdminComponent]
})
export class GlobalAdminModule {}
