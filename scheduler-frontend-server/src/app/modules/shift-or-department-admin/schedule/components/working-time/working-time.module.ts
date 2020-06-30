import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../../../shared/shared.module";
import { ScheduleTableModule } from "../../../../../lib/ngx-schedule-table/schedule-table.module";
import { MonthYearPaginatorModule } from "../../../../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { YearPaginationStrategy } from "../../../../../shared/paginators/pagination-strategy/year-pagination-strategy";
import { WorkingTimeTableDataCollector } from "./components/collectors/working-time-table-data-collector";
import { WorkingTimeCellLabelSetter } from "./components/utils/working-time-cell-label-setter";
import { WorkingTimeTableComponent } from "./components/working-time-table/working-time-table.component";
import { WorkingTimeDialogComponent } from './components/working-time-dialog/working-time-dialog.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AvrEntityGenerationModule } from "../../../../../lib/avr-entity-generation/avr-entity-generation.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AvrEntityGenerationModule,
    ReactiveFormsModule,
    ScheduleTableModule,
    MonthYearPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    WorkingTimeTableComponent,
    WorkingTimeDialogComponent
  ],
  providers: [
    YearPaginationStrategy,
    WorkingTimeTableDataCollector,
    WorkingTimeCellLabelSetter
  ]
})
export class WorkingTimeModule {}
