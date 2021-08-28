import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { SchedulesTableComponent } from "./schedules-table/schedules-table.component";
import { TableRowComponent } from "./table-row/table-row.component";
import { TableHeaderComponent } from "./table-header/table-header.component";
import { SelectableRowDirective } from "./directives/selectable-row.directive";
import { TableRowGroupComponent } from "./table-row-group/table-row-group.component";
import { TableRenderer } from "./service/table-renderer.service";
import { ClearSelectionService } from "./service/clear-selection.service";
import { TableStateService } from "./service/table-state.service";
import { SelectionEndService } from "./service/selection-end.service";
import { CellDef, HeaderCellDef } from "./directives/cell";
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "./directives/column";
import { SelectableCellDirective } from "./directives/selectable-cell.directive";
import { GroupLabelDef } from "./directives/group-label";

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
    SelectableCellDirective,
    SelectableRowDirective,
    BeforeDateColumnDef,
    AfterDateColumnDef,
    PageableColumnDef,
    HeaderCellDef,
    CellDef,
    GroupLabelDef
  ],
  exports: [
    SchedulesTableComponent,
    SelectableCellDirective,
    BeforeDateColumnDef,
    AfterDateColumnDef,
    PageableColumnDef,
    HeaderCellDef,
    CellDef,
    GroupLabelDef
  ],
  providers: [
    TableRenderer,
    ClearSelectionService,
    SelectionEndService,
    TableStateService
  ]
})
export class ScheduleTableModule {
  static forRoot(providers: Provider[]): ModuleWithProviders<ScheduleTableModule> {
    return {
      ngModule: ScheduleTableModule,
      providers: providers
    }
  }
}
