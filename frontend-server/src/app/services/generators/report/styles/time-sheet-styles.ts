import { Style } from "exceljs";
import {
  arialCyrBoldSize10,
  arialCyrSize10,
  centerAlign,
  dottedBorders,
  leftRightMediumTopBottomDottedBorders,
  leftRightMediumTopDottedBottomThinBorders,
  leftRightTopDottedBottomThinBorders,
  rightAlign,
  scheduleDataFont
} from "./report-styles";

export class TimeSheetStyles {
  static idCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomDottedBorders
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

  static dataCellStyle: Partial<Style> = {
    font: arialCyrSize10,
    border: dottedBorders,
    alignment: centerAlign
  };

  static lastDataCellStyle: Partial<Style> = {
    font: arialCyrSize10,
    border: leftRightTopDottedBottomThinBorders,
    alignment: centerAlign
  };

  static sumCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopBottomDottedBorders,
    alignment: centerAlign
  };

  static lastSumCellStyle: Partial<Style> = {
    font: scheduleDataFont,
    border: leftRightMediumTopDottedBottomThinBorders,
    alignment: centerAlign
  };
}
