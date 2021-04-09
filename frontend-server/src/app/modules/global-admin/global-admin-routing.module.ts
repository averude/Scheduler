import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserAccountsTableComponent } from "../../components/global-management/enterprise-admin-user-accounts/user-accounts-table/user-accounts-table.component";
import { DayTypeGroupsTableComponent } from "../../components/global-management/day-type-groups/day-type-groups-table/day-type-groups-table.component";
import { EnterprisesTableComponent } from "../../components/global-management/enterprises/enterprises-table/enterprises-table.component";
import { GlobalAdminComponent } from "./global-admin.component";

const routes = [
  {
    path: '',
    component: GlobalAdminComponent,
    children: [
      {
        path: 'enterprises',
        component: EnterprisesTableComponent
      },
      {
        path: 'accounts',
        component: UserAccountsTableComponent
      },
      {
        path: 'groups',
        component: DayTypeGroupsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalAdminRoutingModule {}
