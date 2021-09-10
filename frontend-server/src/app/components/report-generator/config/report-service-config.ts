import { Injectable } from "@angular/core";
import { ReportDataCollector } from "../collectors/report-data-collector";
import { ScheduleReportDataCollector } from "../collectors/schedule-report-data-collector";
import { TimeSheetReportDataCollector } from "../collectors/time-sheet-report-data-collector";
import { ReportDecorator } from "../decorator/report-decorator";
import { ReportCreator } from "../creator/report-creator";
import { ScheduleReportDecorator } from "../decorator/schedule-report-decorator";
import { TimeSheetReportDecorator } from "../decorator/time-sheet-report-decorator";
import { ScheduleReportCreator } from "../creator/schedule-report-creator";
import { TimeSheetReportCreator } from "../creator/time-sheet-report-creator";
import { CellFiller } from "../core/cell-filler";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";
import { CellEnabledSetter } from "../../../services/collectors/schedule/cell-enabled-setter";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { ReportTableSortingStrategy } from "../../../shared/table-sorting-strategies/report-table-sorting-strategy";

@Injectable()
export class ReportServiceConfig {

  private _collectorsMap: Map<string, ReportDataCollector>;
  private _creatorsMap:   Map<string, ReportCreator>;
  private _decoratorsMap: Map<string, ReportDecorator>;

  constructor(private cellFiller: CellFiller,
              private intervalCreator: IntervalCreator,
              private cellEnabledSetter: CellEnabledSetter,
              private cellCollector: CellCollector,
              private tableSortingStrategy: ReportTableSortingStrategy){}

  get collectors(): Map<string, ReportDataCollector> {
    if (!this._collectorsMap) {
      this._collectorsMap = new Map<string, ReportDataCollector>();
      const scheduleReportDataCollector = new ScheduleReportDataCollector(this.intervalCreator, this.cellEnabledSetter, this.cellCollector, this.tableSortingStrategy);
      const timeSheetReportDataCollector = new TimeSheetReportDataCollector(this.intervalCreator, this.cellEnabledSetter, this.cellCollector, this.tableSortingStrategy);
      this._collectorsMap.set(scheduleReportDataCollector.REPORT_TYPE, scheduleReportDataCollector);
      this._collectorsMap.set(timeSheetReportDataCollector.REPORT_TYPE, timeSheetReportDataCollector);
    }
    return this._collectorsMap;
  }

  get decorators(): Map<string, ReportDecorator> {
    if (!this._decoratorsMap) {
      this._decoratorsMap = new Map<string, ReportDecorator>();
      const scheduleReportDecorator = new ScheduleReportDecorator();
      const timeSheetReportDecorator = new TimeSheetReportDecorator();
      this._decoratorsMap.set(scheduleReportDecorator.REPORT_TYPE, scheduleReportDecorator);
      this._decoratorsMap.set(timeSheetReportDecorator.REPORT_TYPE, timeSheetReportDecorator);
    }
    return this._decoratorsMap;
  }

  get creators(): Map<string, ReportCreator> {
    if (!this._creatorsMap) {
      this._creatorsMap = new Map<string, ReportCreator>();
      const scheduleReportCreator = new ScheduleReportCreator(this.cellFiller);
      const timeSheetReportCreator = new TimeSheetReportCreator(this.cellFiller);
      this._creatorsMap.set(scheduleReportCreator.REPORT_TYPE, scheduleReportCreator);
      this._creatorsMap.set(timeSheetReportCreator.REPORT_TYPE, timeSheetReportCreator);
    }
    return this._creatorsMap;
  }
}
