import { InjectionToken, NgModule } from "@angular/core";
import { DataCollectorModule } from "../../../shared/collectors/data-collector.module";
import { CollectorHandler } from "../../../shared/collectors/collector-handler";
import { HeaderDataCollectorHandler } from "./handlers/header-data-collector-handler";
import { BodyDataCollectorHandler } from "./handlers/body-data-collector-handler";

export const WORKING_NORM_COLLECTOR_HANDLERS = new InjectionToken<CollectorHandler>('Working norm collector handlers');

@NgModule({
  imports: [
    DataCollectorModule
  ],
  providers: [
    {provide: WORKING_NORM_COLLECTOR_HANDLERS, useClass: HeaderDataCollectorHandler, multi: true},
    {provide: WORKING_NORM_COLLECTOR_HANDLERS, useClass: BodyDataCollectorHandler, multi: true},
  ]
})
export class WorkingNormCollectorModule {}
