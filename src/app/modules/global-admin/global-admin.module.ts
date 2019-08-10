import { NgModule } from "@angular/core";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { CommonModule } from "@angular/common";
import { DepartmentsModule } from "./departments/departments.module";
import { GlobalAdminRoutingModule } from "./global-admin-routing.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { OPTIONS } from "../admin/notification-options";
import { AccountsModule } from "./accounts/accounts.module";
import { DepartmentIconsModule } from "./department-icons/department-icons.module";

@NgModule({
 imports: [
   CommonModule,
   GlobalAdminRoutingModule,
   AccountsModule,
   DepartmentsModule,
   DepartmentIconsModule,
   SimpleNotificationsModule.forRoot(OPTIONS)
 ],
 declarations: [GlobalAdminComponent]
})
export class GlobalAdminModule {}
