import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { WorkingNormTableComponent } from "./working-norm-table/working-norm-table.component";

const routes: Route[] = [
  {
    path: '',
    component: WorkingNormTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingNormRoutingModule {}
