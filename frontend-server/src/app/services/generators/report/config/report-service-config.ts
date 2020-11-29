import { Injectable } from "@angular/core";
import { ReportDataCollector } from "../collector/report-data-collector";
import { ScheduleReportDataCollector } from "../collector/schedule-report-data-collector";
import { TimeSheetReportDataCollector } from "../collector/time-sheet-report-data-collector";
import { ReportDecorator } from "../decorator/report-decorator";
import { ReportCreator } from "../creator/report-creator";
import { ScheduleReportDecorator } from "../decorator/schedule-report-decorator";
import { TimeSheetReportDecorator } from "../decorator/time-sheet-report-decorator";
import { ScheduleReportCreator } from "../creator/schedule-report-creator";
import { TimeSheetReportCreator } from "../creator/time-sheet-report-creator";
import { ReportMarkup } from "../model/report-markup";
import { SCHEDULE_REPORT, TIME_SHEET_REPORT } from "../model/report-types";
import { CellFiller } from "../core/cell-filler";

@Injectable()
export class ReportServiceConfig {

  private _collectorsMap: Map<string, ReportDataCollector>;
  private _creatorsMap:   Map<string, ReportCreator>;
  private _decoratorsMap: Map<string, ReportDecorator>;
  private _markupsMap:    Map<string, ReportMarkup>;

  constructor(private cellFiller: CellFiller){}

  get collectors(): Map<string, ReportDataCollector> {
    if (!this._collectorsMap) {
      this._collectorsMap = new Map<string, ReportDataCollector>();
      const scheduleReportDataCollector = new ScheduleReportDataCollector();
      const timeSheetReportDataCollector = new TimeSheetReportDataCollector();
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

  get markups(): Map<string, ReportMarkup> {
    if (!this._markupsMap) {
      this._markupsMap = new Map<string, ReportMarkup>();
      const scheduleReportMarkup = {
        col_start_num: 2,
        row_start_num: 2,
        header_height: 2,
        table_creator_interval: 4,
        row_step: 1,
        cols_before_data: 3,
        report_label: 'ГРАФІК'
      } as ReportMarkup;
      this._markupsMap.set(SCHEDULE_REPORT, scheduleReportMarkup);
      const timeSheetReportMarkup = {
        col_start_num: 2,
        row_start_num: 2,
        header_height: 1,
        table_creator_interval: 3,
        row_step: 2,
        cols_before_data: 2,
        report_label: 'ТАБЕЛЬ'
      } as ReportMarkup;
      this._markupsMap.set(TIME_SHEET_REPORT, timeSheetReportMarkup);
    }
    return this._markupsMap;
  }

}
