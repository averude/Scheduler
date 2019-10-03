import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from "./components/report-form/report-form.component";
import { MatDatepickerModule, MatInputModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  declarations: [
    ReportFormComponent
  ],
  providers: [
    MatMomentDateModule
  ]
})
export class ReportsModule { }
