import { NgModule } from "@angular/core";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { TableSumCalculator } from "../../calculators/table-sum-calculator.service";
import { TableRowFiller } from "./table-row-filler";
import { CellEnabledSetter } from "./cell-enabled-setter";
import {
  AfterDataCollectedCollectorHandler,
  BodyDataCollectorHandler,
  HANDLERS,
  HeaderDataCollectorHandler
} from "./collector-handler";
import { UIPrioritySortingStrategy } from "../../../components/calendar/utils/ui-priority-sorting-strategy";
import { ScheduleFilteringStrategy } from "../../../components/calendar/utils/schedule-filtering-strategy";
import { TableDataCollector } from "../../../shared/collectors/table-data-collector";

@NgModule({
  providers: [
    {provide: HANDLERS, useClass: HeaderDataCollectorHandler, multi: true},
    {provide: HANDLERS, useClass: BodyDataCollectorHandler, multi: true},
    {provide: HANDLERS, useClass: AfterDataCollectedCollectorHandler, multi: true},
    IntervalCreator,
    TableSumCalculator,
    TableRowFiller,
    CellEnabledSetter,
    UIPrioritySortingStrategy,
    ScheduleFilteringStrategy,
    TableDataCollector
  ]
})
export class TableCollectorModule {}
