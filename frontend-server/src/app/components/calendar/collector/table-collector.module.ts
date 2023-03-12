import { InjectionToken, NgModule } from "@angular/core";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";
import { TableSumCalculator } from "../../../services/calculators/table-sum-calculator.service";
import { TableRowFiller } from "./table-row-filler";
import { UIPrioritySortingStrategy } from "../utils/ui-priority-sorting-strategy";
import { ScheduleFilteringStrategy } from "../utils/schedule-filtering-strategy";
import { DataCollectorModule } from "../../../shared/collectors/data-collector.module";
import { HeaderDataCollectorHandler } from "./handlers/header-data-collector-handler";
import { BodyDataCollectorHandler } from "./handlers/body-data-collector-handler";
import { AfterDataCollectedCollectorHandler } from "./handlers/after-data-collected-collector-handler";
import { ICollectorHandler } from "../../../shared/collectors/collector-handler";

export const SCHEDULE_COLLECTOR_HANDLERS = new InjectionToken<ICollectorHandler>('Schedule collector handlers');

@NgModule({
  imports: [
    DataCollectorModule
  ],
  providers: [
    {provide: SCHEDULE_COLLECTOR_HANDLERS, useClass: HeaderDataCollectorHandler, multi: true},
    {provide: SCHEDULE_COLLECTOR_HANDLERS, useClass: BodyDataCollectorHandler, multi: true},
    {provide: SCHEDULE_COLLECTOR_HANDLERS, useClass: AfterDataCollectedCollectorHandler, multi: true},
    IntervalCreator,
    TableSumCalculator,
    TableRowFiller,
    UIPrioritySortingStrategy,
    ScheduleFilteringStrategy,
  ]
})
export class TableCollectorModule {}
