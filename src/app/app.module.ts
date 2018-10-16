import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { AppRoutingModule } from './/app-routing.module';
import { TableRowComponent } from './components/schedules/table-row/table-row.component';
import { TableHeaderComponent } from './components/schedules/table-header/table-header.component';
import { TableCellComponent } from './components/schedules/table-cell/table-cell.component';
import { PositionsComponent } from './components/positions/positions.component';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditableRowDirective } from './directives/editable-row.directive';
import { AddPositionComponent } from './components/positions/add-position/add-position.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleLabelPipe } from './pipes/schedule-label.pipe';
import { MonthNameImpurePipe } from './pipes/month-name-impure.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    SchedulesComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableCellComponent,
    PositionsComponent,
    AddEmployeeComponent,
    EditableRowDirective,
    AddPositionComponent,
    ScheduleLabelPipe,
    MonthNameImpurePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ContextMenuModule.forRoot({
      autoFocus: true,
      useBootstrap4: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
