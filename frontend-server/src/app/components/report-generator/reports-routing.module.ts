import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ReportGeneratorFormComponent } from "./report-generator-form/report-generator-form.component";

const routes: Route[] = [
  {
    path: '',
    component: ReportGeneratorFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
