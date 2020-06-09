import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserAccountsTableComponent } from "./enterprise-admin-user-accounts/components/user-accounts-table/user-accounts-table.component";
import { DayTypeGroupsTableComponent } from "./day-type-groups/components/day-type-groups-table/day-type-groups-table.component";
import { EnterprisesTableComponent } from "./enterprises/components/enterprises-table/enterprises-table.component";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";

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
