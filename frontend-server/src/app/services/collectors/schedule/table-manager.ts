import { ScheduleRow, ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { AddMainShiftCompositionDialogComponent } from "../../../components/calendar/schedule-table-shift-composition-dialog/add-main-shift-composition-dialog/add-main-shift-composition-dialog.component";
import { Composition, MainComposition } from "../../../model/composition";
import { getEmployeeShortName } from "../../../shared/utils/utils";
import { EditCompositionsDialogComponent } from "../../../components/calendar/schedule-table-shift-composition-dialog/edit-compositions-dialog/edit-compositions-dialog.component";
import { SelectionData } from "../../../lib/ngx-schedule-table/model/selection-data";
import { AddSubstitutionCompositionDialogComponent } from "../../../components/calendar/schedule-table-shift-composition-dialog/add-substitution-composition-dialog/add-substitution-composition-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { TableCompositionHandler } from "./table-composition-handler";
import { Injectable } from "@angular/core";
import { InitialData } from "../../../model/datasource/initial-data";

@Injectable()
export class TableManager {

  constructor(private dialog: MatDialog,
              private tableCompositionHandler: TableCompositionHandler) {
  }

  newRow(rowGroup: ScheduleRowGroup, initData: InitialData) {
    const data = {
      shiftId:  rowGroup.id,
      initData: initData
    };

    this.dialog.open(AddMainShiftCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe((mainShiftCompositions: MainComposition[]) => {
        if (!mainShiftCompositions) {
          return;
        }

        mainShiftCompositions
          .forEach(composition =>
            this.tableCompositionHandler
              .createOrUpdate([composition], rowGroup, null,
                null, data.initData, false));
      });
  }

  editRow(row: ScheduleRow, initData: InitialData) {
    if (!row || !row.group) {
      return;
    }

    const groupData = row.group;
    const data = {
      compositions: row.compositions,
      initData:     initData,
      employeeName: getEmployeeShortName(row.employee)
    };

    this.openDialog(data, groupData, row);
  }

  addSubstitutionDialog(selectionData: SelectionData, initData: InitialData) {
    const mainCompositionRow = <ScheduleRow> selectionData.row;

    const data = {
      from: selectionData.selectedCells[0].date.isoString,
      to:   selectionData.selectedCells[selectionData.selectedCells.length - 1].date.isoString,
      initData: initData,
      employee: mainCompositionRow.employee,
      mainComposition: mainCompositionRow.compositions[0]
    };

    this.dialog.open(AddSubstitutionCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe(value => {
        if (value) {
          const group = mainCompositionRow.group.table.findRowGroup(value.shiftId);
          this.tableCompositionHandler
            .createOrUpdate([value], group, null,
              mainCompositionRow, data.initData, true);
        }
      });
  }

  private openDialog(data, rowGroup: ScheduleRowGroup, row: ScheduleRow) {
    this.dialog.open(EditCompositionsDialogComponent, {data: data})
      .afterClosed()
      .subscribe((dialogResult) => {
        if (!dialogResult) {
          return;
        }

        const compositions: Composition[] = dialogResult.data;
        switch (dialogResult.command) {

          case 'save' : {
            this.tableCompositionHandler
              .createOrUpdate(compositions, rowGroup, row, null,
                data.initData, row.isSubstitution);
            break;
          }

          case 'delete' : {
            this.tableCompositionHandler
              .remove(rowGroup, row, data.initData, compositions);
            break;
          }

          default : {
            throw new Error('Wrong command');
          }
        }
      });
  }
}
