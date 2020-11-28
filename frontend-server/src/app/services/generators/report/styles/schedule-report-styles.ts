import { Style } from "exceljs";
import {
  arialCyrSize10,
  arialCyrSize8,
  centerAlignVertRotation,
  centerMiddleAlign,
  dottedBorders,
  holidayFill,
  leftRightBottomMediumBorders,
  leftRightMediumBorders,
  leftRightMediumTopBottomThinBorders,
  leftRightThinBottomMediumBorders,
  mediumBorders,
  scheduleDataFont,
  topLeftRightMediumBorders,
  topMediumBorders,
  topMediumLeftRightThinBorders,
  weekendFill
} from "./report-styles";

export class ScheduleReportStyles {

  static idHeaderCellStyle: Partial<Style> = {
    font: arialCyrSize10,
    border: mediumBorders,
    alignment: centerMiddleAlign
  };

  static nameHeaderCellStyle: Partial<Style> = {
    font: arialCyrSize10,
    border: mediumBorders,
    alignment: centerMiddleAlign
  };

  static positionHeaderCellStyle: Partial<Style>[] = [
    {
      border: topLeftRightMediumBorders
    },
    {
      font: arialCyrSize10,
      border: leftRightMediumBorders,
      alignment: centerAlignVertRotation
    },
    {
      border: leftRightBottomMediumBorders
    }
  ];

  static scheduleHeaderCellStyle: Partial<Style>[] = [
    {
      border: topMediumBorders
    },
    {
      border: topMediumLeftRightThinBorders
    },
    {
      font: arialCyrSize10,
      border: leftRightThinBottomMediumBorders
    }
  ];

  static holidayScheduleHeaderCellStyle: Partial<Style> = {
    border: topMediumLeftRightThinBorders,
    fill: holidayFill
  };

  static weekendScheduleHeaderCellStyle: Partial<Style> = {
    border: topMediumLeftRightThinBorders,
    fill: weekendFill
  };

  static sumHeaderCellStyle: Partial<Style> = {
    font: arialCyrSize8,
    border: mediumBorders,
    alignment: centerAlignVertRotation
  };

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
