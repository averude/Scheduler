import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { SchedulesTableComponent } from './components/schedules-table/schedules-table.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';
import { PaginatorService } from './paginator.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
      useBootstrap4: true
    })],
  declarations: [
    SchedulesTableComponent,
    TablePaginatorComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableCellComponent
  ],
  providers: [PaginatorService]
})
export class SchedulesModule {}
