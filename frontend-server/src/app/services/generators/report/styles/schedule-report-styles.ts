import { Style } from "exceljs";
import {
  centerMiddleAlign,
  dottedBorders,
  holidayFill,
  leftRightMediumTopBottomThinBorders,
  scheduleDataFont,
  weekendFill
} from "./report-styles";

export class ScheduleReportStyles {

  static idCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomThinBorders
  };

  static nameCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomThinBorders
  };

  static positionCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomThinBorders
  };

  static scheduleCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    alignment: centerMiddleAlign,
    border: dottedBorders
  };

  static weekendScheduleCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    alignment: centerMiddleAlign,
    border: dottedBorders,
    fill: weekendFill
  };

  static holidayScheduleCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    alignment: centerMiddleAlign,
    border: dottedBorders,
    fill: holidayFill
  };

  static sumCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    alignment: centerMiddleAlign,
    border: leftRightMediumTopBottomThinBorders
  };
}
