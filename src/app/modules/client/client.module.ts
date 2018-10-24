import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { CommonModule } from '@angular/common';
import { ScheduleTableComponent } from './components/schedule-table/schedule-table.component';
import { ScheduleTablePaginatorComponent } from './components/schedule-table-paginator/schedule-table-paginator.component';
import { PaginatorService } from './paginator.service';
import { ScheduleTableCellComponent } from './components/schedule-table-cell/schedule-table-cell.component';

@NgModule({
  imports: [CommonModule, ClientRoutingModule],
  declarations: [
    ScheduleTableComponent,
    ScheduleTablePaginatorComponent,
    ScheduleTableCellComponent
  ],
  providers: [PaginatorService]
})
export class ClientModule {}
