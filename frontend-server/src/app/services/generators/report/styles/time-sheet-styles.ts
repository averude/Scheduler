import { Style } from "exceljs";
import {
  arialCyrBoldSize10,
  arialCyrSize10,
  arialCyrSize8,
  bottomMediumLeftRightDottedBorders,
  centerAlignVertRotation,
  centerMiddleAlign,
  dottedBorders,
  greyArialCyrSize10,
  holidayFill,
  leftRightMediumTopBottomDottedBorders,
  leftRightMediumTopDottedBottomThinBorders,
  leftRightTopDottedBottomThinBorders,
  mediumBorders,
  rightAlign,
  scheduleDataFont,
  topMediumLeftRightDottedBorders,
  weekendFill
} from "./report-styles";

export class TimeSheetStyles {

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

  static dataHeaderCellStyle: Partial<Style>[] = [
    {
      border: topMediumLeftRightDottedBorders
    },
    {
      alignment: centerMiddleAlign,
      font: arialCyrSize10,
      border: bottomMediumLeftRightDottedBorders
    }
  ];

  static weekendDataHeaderCellStyle: Partial<Style>[] = [
    {
      border: topMediumLeftRightDottedBorders,
      fill: weekendFill
    },
    {
      alignment: centerMiddleAlign,
      font: arialCyrSize10,
      border: bottomMediumLeftRightDottedBorders
    }
  ];

  static holidayDataHeaderCellStyle: Partial<Style>[] = [
    {
      border: topMediumLeftRightDottedBorders,
      fill: holidayFill
    },
    {
      alignment: centerMiddleAlign,
      font: arialCyrSize10,
      border: bottomMediumLeftRightDottedBorders
    }
  ];

  static sumHeaderCellStyle: Partial<Style> = {
    font: arialCyrSize8,
    border: mediumBorders,
    alignment: centerAlignVertRotation
  };

  static idCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomDottedBorders,
    alignment: centerMiddleAlign
  };

  static lastIdCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopDottedBottomThinBorders
  };

  static nameCellStyle: Partial<Style> = {
    font: arialCyrBoldSize10,
    border: leftRightMediumTopBottomDottedBorders
  };

  static positionCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopDottedBottomThinBorders,
    alignment: rightAlign
  };

  static dataCellStyle: Partial<Style>[] = [
    {
      font: arialCyrSize10,
      border: dottedBorders,
      alignment: centerMiddleAlign
    },
    {
      font: arialCyrSize10,
      border: leftRightTopDottedBottomThinBorders,
      alignment: centerMiddleAlign
    }
  ];

  static disabledDataCellStyle: Partial<Style>[] = [
    {
      font: greyArialCyrSize10,
      border: dottedBorders,
      alignment: centerMiddleAlign
    },
    {
      font: greyArialCyrSize10,
      border: leftRightTopDottedBottomThinBorders,
      alignment: centerMiddleAlign
    }
  ];

  static weekendDataCellStyle: Partial<Style>[] = [
    {
      font: arialCyrSize10,
      border: dottedBorders,
      alignment: centerMiddleAlign,
      fill: weekendFill
    },
    {
      font: arialCyrSize10,
      border: leftRightTopDottedBottomThinBorders,
      alignment: centerMiddleAlign,
      fill: weekendFill
    }
  ];

  static holidayDataCellStyle: Partial<Style>[] = [
    {
      font: arialCyrSize10,
      border: dottedBorders,
      alignment: centerMiddleAlign,
      fill: holidayFill
    },
    {
      font: arialCyrSize10,
      border: leftRightTopDottedBottomThinBorders,
      alignment: centerMiddleAlign,
      fill: holidayFill
    }
  ];

  static disabledWeekendDataCellStyle: Partial<Style>[] = [
    {
      font: greyArialCyrSize10,
      border: dottedBorders,
      alignment: centerMiddleAlign,
      fill: weekendFill
    },
    {
      font: greyArialCyrSize10,
      border: leftRightTopDottedBottomThinBorders,
      alignment: centerMiddleAlign,
      fill: weekendFill
    }
  ];

  static disabledHolidayDataCellStyle: Partial<Style>[] = [
    {
      font: greyArialCyrSize10,
      border: dottedBorders,
      alignment: centerMiddleAlign,
      fill: holidayFill
    },
    {
      font: greyArialCyrSize10,
      border: leftRightTopDottedBottomThinBorders,
      alignment: centerMiddleAlign,
      fill: holidayFill
    }
  ];

  static sumCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomDottedBorders,
    alignment: centerMiddleAlign
  };

  static lastSumCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopDottedBottomThinBorders,
    alignment: centerMiddleAlign
  };
}
