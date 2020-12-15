import { ShiftCompositionDivider } from "../../divider/shift-composition-divider";
import { Row, TableData } from "../../../model/ui/schedule-table/table-data";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../../model/main-shift-composition";
import { CellData } from "../../../lib/ngx-schedule-table/model/data/cell-data";
import { Moment } from "moment";
import { Injectable } from "@angular/core";

@Injectable()
export class CellEnabledSetter {

  constructor(private divider: ShiftCompositionDivider) {}


  setTableEnabledCells(tree: TableData,
                       substitutionShiftCompositions: SubstitutionShiftComposition[]) {
    if (!substitutionShiftCompositions) {
      return;
    }

    tree.groups.forEach(group =>
      group.rows.forEach(row => {
        const composition = (row as Row).composition;

        if ((composition as SubstitutionShiftComposition).mainShiftComposition) {
          this.setComposition(tree, composition);
        } else {
          this.divider.divide(composition,
            this.filterSubstitutions((row as Row), substitutionShiftCompositions))
            .forEach(value => this.setComposition(tree, value));
        }
      }));
  }

  setRowsEnabledCells(rows: Row[],
                      mainShiftCompositions: MainShiftComposition[],
                      substitutionShiftCompositions: SubstitutionShiftComposition[]) {
    rows.forEach(row => {
      this.divider.divide(row.composition, this.filterSubstitutions(row, substitutionShiftCompositions))
        .map(composition => this.setCellsComposition(row.cellData, row.group.table.from, row.group.table.to, composition));
    })
  }

  setRowEnabledCells(row: Row,
                     substitutionShiftCompositions?: SubstitutionShiftComposition[]) {
    if (substitutionShiftCompositions) {
      this.divider.divide(row.composition, this.filterSubstitutions(row, substitutionShiftCompositions))
        .forEach(composition => this.setCellsComposition(row.cellData, row.group.table.from, row.group.table.to, composition));
    } else {
      this.setCellsComposition(row.cellData, row.group.table.from, row.group.table.to, row.composition);
    }
  }

  private filterSubstitutions(row: Row,
                              substitutionShiftCompositions: SubstitutionShiftComposition[]) {
    return substitutionShiftCompositions
      .filter(composition => composition.employee.id === row.id && composition.shiftId !== row.group.id);
  }

  private setComposition(tree: TableData,
                         composition: MainShiftComposition | SubstitutionShiftComposition) {
    const cells = tree.findRow(composition.shiftId, composition.employee.id)?.cellData;
    this.setCellsComposition(cells, tree.from, tree.to, composition);
  }

  private setCellsComposition(cells: CellData[],
                              from: Moment,
                              to: Moment,
                              composition: MainShiftComposition | SubstitutionShiftComposition) {
    if (!cells || cells.length === 0) {
      return;
    }

    const begin = from.isSameOrAfter(composition.from) ? from : composition.from;
    const end   = to.isSameOrBefore(composition.to) ? to : composition.to;

    let start_idx = begin.date() - 1;
    let end_idx   = end.date();

    if (cells.length < end_idx) {
      end_idx = cells.length;
    }

    for (let i = 0; i < start_idx; i++) {
      cells[i].enabled = false;
    }

    for (let i = start_idx; i < end_idx; i++) {
      cells[i].enabled = true;
    }

    for (let i = end_idx; i < cells.length; i++) {
      cells[i].enabled = false;
    }
  }
}
