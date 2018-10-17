import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { SchedulesTableComponent } from './components/schedules-table/schedules-table.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
      useBootstrap4: true
    })],
  declarations: [
    SchedulesTableComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableCellComponent
  ],
  exports: [
    SchedulesTableComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableCellComponent,
  ],
  providers: []
})
export class SchedulesModule {}
