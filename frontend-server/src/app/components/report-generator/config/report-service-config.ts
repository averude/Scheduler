import { Injectable } from "@angular/core";
import { ReportDecorator } from "../decorator/report-decorator";
import { ReportCreator } from "../creator/report-creator";
import { ScheduleReportDecorator } from "../decorator/schedule-report-decorator";
import { TimeSheetReportDecorator } from "../decorator/time-sheet-report-decorator";
import { ScheduleReportCreator } from "../creator/schedule-report-creator";
import { TimeSheetReportCreator } from "../creator/time-sheet-report-creator";
import { CellFiller } from "../core/cell-filler";
import { ReportCollectorStrategy } from "../collectors/strategy/report-collector-strategy";
import { ScheduleReportCollectorStrategy } from "../collectors/strategy/schedule-report-collector-strategy";
import { ReportCellCollector } from "../collectors/report-cell-collector";
import { TimeSheetReportCollectorStrategy } from "../collectors/strategy/time-sheet-report-collector-strategy";
import { CollectorHandler } from "../../../shared/collectors/collector-handler";
import { IntervalCreator } from "../../../services/creator/interval-creator.service";
import { ReportMarkup } from "../model/report-markup";
import { SCHEDULE_REPORT, TIME_SHEET_REPORT } from "../model/report-types";

@Injectable()
export class ReportServiceConfig {

  private _markupMap:     Map<string, ReportMarkup>;
  private _creatorsMap:   Map<string, ReportCreator>;
  private _decoratorsMap: Map<string, ReportDecorator>;
  private _collectorStrategiesMap: Map<string, ReportCollectorStrategy>;
  private _collectorHandlers: CollectorHandler[];

  constructor(private cellFiller: CellFiller,
              private intervalCreator: IntervalCreator,
              private reportCellCollector: ReportCellCollector){}

  get collectorStrategies(): Map<string, ReportCollectorStrategy> {
    if (!this._collectorStrategiesMap) {
      this._collectorStrategiesMap = new Map<string, ReportCollectorStrategy>();
      const scheduleReportCollectorStrategy = new ScheduleReportCollectorStrategy(this.reportCellCollector);
      const timeSheetReportCollectorStrategy = new TimeSheetReportCollectorStrategy(this.reportCellCollector);
      this._collectorStrategiesMap.set(scheduleReportCollectorStrategy.REPORT_TYPE, scheduleReportCollectorStrategy);
      this._collectorStrategiesMap.set(timeSheetReportCollectorStrategy.REPORT_TYPE, timeSheetReportCollectorStrategy);
    }
    return this._collectorStrategiesMap;
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

  get reportMarkups(): Map<string, ReportMarkup> {
    if (!this._markupMap) {
      this._markupMap = new Map<string, ReportMarkup>();

      this._markupMap.set(SCHEDULE_REPORT, {
        sheet_row_start_num: 2,
        sheet_col_start_num: 2,
        table_header_height: 2,
        table_creator_interval: 4,
        table_data_row_step: 1,
        table_cols_before_data: 3,
        table_report_label: 'ГРАФІК'
      } as ReportMarkup);

      this._markupMap.set(TIME_SHEET_REPORT, {
        sheet_row_start_num: 2,
        sheet_col_start_num: 2,
        table_header_height: 1,
        table_creator_interval: 3,
        table_data_row_step: 2,
        table_cols_before_data: 2,
        table_report_label: 'ТАБЕЛЬ'
      } as ReportMarkup);
    }
    return this._markupMap;
  }
}
