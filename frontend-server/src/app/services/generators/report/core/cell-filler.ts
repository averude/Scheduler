import { Cell, Row, Style } from "exceljs";
import { Injectable } from "@angular/core";

@Injectable()
export class CellFiller {

  public fill(rs: Row | Row[],
              col_idx: number,
              values: any | any[],
              cells_styles: Partial<Style> | Partial<Style>[],
              afterCellProcessed?: (cell: Cell, row_index?: number) => void) {
    const data    = [].concat(values);
    const rows    = [].concat(rs);
    const styles  = [].concat(cells_styles);

    for (let row_idx = 0, value_idx = 0, style_idx = 0; row_idx < rows.length; row_idx++) {
      const cell = rows[row_idx].getCell(col_idx);

      if (data) {
        const value = data[value_idx];

        if (Number.isInteger(value)) {
          cell.numFmt = '0.00';
        }

        cell.value = value;

        if (value_idx < data.length - 1) {
          value_idx++;
        }
      }

      if (styles) {
        cell.style = styles[style_idx];

        if (style_idx < styles.length - 1) {
          style_idx++;
        }
      }

      if (afterCellProcessed) {
        afterCellProcessed(cell, row_idx);
      }
    }
  }
}
