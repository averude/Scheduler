import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { SchedulesTableComponent } from "./schedules-table/schedules-table.component";
import { TableRowComponent } from "./table-row/table-row.component";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { SelectableRowDirective } from "./directives/selectable-row.directive";
import { TableRowGroupComponent } from "./table-shift-group/table-row-group.component";
import { RowRendererService } from "./service/row-renderer.service";
import { ClearSelectionService } from "./service/clear-selection.service";
import { CellStateService } from "./service/cell-state.service";
import { DatePaginationService } from "./service/date-pagination.service";
import { SelectionEndService } from "./service/selection-end.service";
import { TableTopItemDirective } from './directives/table-top-item.directive';
import { CellDef, DatedCellDef, HeaderCellDef, HeaderDateCellDef } from "./directives/cell";
import { AfterDateColumnDef, BeforeDateColumnDef } from "./directives/column";
import { PaginatorDef } from "./directives/paginator";
import { SelectableCellDirective } from "./directives/selectable-cell.directive";
import { TableCellComponent } from "./table-cell/table-cell.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    SchedulesTableComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableRowGroupComponent,
    TableCellComponent,
    SelectableCellDirective,
    SelectableRowDirective,
    TableTopItemDirective,
    PaginatorDef,
    BeforeDateColumnDef,
    AfterDateColumnDef,
    HeaderCellDef,
    HeaderDateCellDef,
    DatedCellDef,
    CellDef,
  ],
  exports: [
    SchedulesTableComponent,
    SelectableCellDirective,
    TableTopItemDirective,
    PaginatorDef,
    BeforeDateColumnDef,
    AfterDateColumnDef,
    HeaderCellDef,
    HeaderDateCellDef,
    DatedCellDef,
    CellDef
  ],
  providers: [
    DatePaginationService,
    RowRendererService,
    ClearSelectionService,
    SelectionEndService,
    CellStateService
  ]
})
export class ScheduleTableModule {
  static forRoot(providers: Provider[]): ModuleWithProviders {
    return {
      ngModule: ScheduleTableModule,
      providers: providers
    }
  }
}
