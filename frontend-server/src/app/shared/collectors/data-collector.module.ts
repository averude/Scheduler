import { NgModule } from "@angular/core";
import { CellCollector } from "./cell-collector";
import { CellEnabledSetter } from "./cell-enabled-setter";
import { TableDataCollector } from "./table-data-collector";

@NgModule({
  providers: [
    CellCollector,
    CellEnabledSetter,
    TableDataCollector
  ]
})
export class DataCollectorModule {}
