import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { SchedulesTableComponent } from './components/schedules-table/schedules-table.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MonthYearPaginatorComponent } from "../../../shared/paginators/month-year-paginator/month-year-paginator.component";
import { TableShiftGroupComponent } from './components/table-shift-group/table-shift-group.component';
import { PaginatorService } from "../../../shared/paginators/paginator.service";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { SelectableRowDirective } from "../../../shared/directives/selectable-row.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ContextMenuModule.forRoot({
      autoFocus: true
    })
  ],
  declarations: [
    SchedulesTableComponent,
    MonthYearPaginatorComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableCellComponent,
    TableShiftGroupComponent,
    SelectableRowDirective
  ],
  providers: [PaginatorService]
})
export class SchedulesModule {}
