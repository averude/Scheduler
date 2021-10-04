import { InjectionToken, NgModule } from "@angular/core";
import { DataCollectorModule } from "../../../shared/collectors/data-collector.module";
import { ReportDataHeaderCollectorHandler } from "./handlers/report-data-header-collector-handlers";
import { ReportCellCollector } from "./report-cell-collector";
import { ReportDataBodyCollectorHandler } from "./handlers/report-data-body-collector-handler";
import { CollectorHandler } from "../../../shared/collectors/collector-handler";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";

export const REPORT_COLLECTOR_HANDLERS = new InjectionToken<CollectorHandler>('Report collector handlers');

@NgModule({
  imports: [
    DataCollectorModule
  ],
  providers: [
    {provide: REPORT_COLLECTOR_HANDLERS, useClass: ReportDataHeaderCollectorHandler, multi: true},
    {provide: REPORT_COLLECTOR_HANDLERS, useClass: ReportDataBodyCollectorHandler, multi: true},
    ReportCellCollector,
    IntervalCreator
  ]
})
export class ReportCollectorModule {}
