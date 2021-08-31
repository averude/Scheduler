import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { StatisticsTableComponent } from "./statistics-table/statistics-table.component";

const routes: Route[] = [
  {
    path: '',
    component: StatisticsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule {}
