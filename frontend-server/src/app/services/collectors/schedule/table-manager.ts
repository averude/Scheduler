import { ScheduleRow, ScheduleRowGroup } from "../../../model/ui/schedule-table/table-data";
import { AddMainShiftCompositionDialogComponent } from "../../../components/calendar/schedule-table-shift-composition-dialog/add-main-shift-composition-dialog/add-main-shift-composition-dialog.component";
import { Composition, MainComposition } from "../../../model/composition";
import { getEmployeeShortName } from "../../../shared/utils/utils";
import { EditCompositionsDialogComponent } from "../../../components/calendar/schedule-table-shift-composition-dialog/edit-compositions-dialog/edit-compositions-dialog.component";
import { SelectionData } from "../../../lib/ngx-schedule-table/model/selection-data";
import { AddSubstitutionCompositionDialogComponent } from "../../../components/calendar/schedule-table-shift-composition-dialog/add-substitution-composition-dialog/add-substitution-composition-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { TableDataSource } from "./table-data-source";
import { TableCompositionHandler } from "./table-composition-handler";
import { Injectable } from "@angular/core";

@Injectable()
export class TableManager {

  constructor(private dialog: MatDialog,
              private tableCompositionHandler: TableCompositionHandler,
              private tableDataSource: TableDataSource) {
  }

  newRow(rowGroup: ScheduleRowGroup) {
    const data = {
      shiftId:      rowGroup.id,
      shifts:       this.tableDataSource.shifts,
      employees:    this.tableDataSource.employees,
      positions:    this.tableDataSource.positions,
      calendarDays: this.tableDataSource.calendarDays
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
              .createOrUpdateComposition([composition], rowGroup, null, null,
                this.tableDataSource.scheduleDto,
                this.tableDataSource.positions,
                this.tableDataSource.workingNorms,
                this.tableDataSource.calendarDays,
                false));
      });
  }

  editRow(row: ScheduleRow) {
    if (!row || !row.group) {
      return;
    }

    const groupData = row.group;
    const data = {
      compositions:   row.compositions,
      positions:      this.tableDataSource.positions,
      calendarDays:   this.tableDataSource.calendarDays,
      employeeName:   getEmployeeShortName(row.employee)
    };

    this.openDialog(data, groupData, row);
  }

  addSubstitutionDialog(selectionData: SelectionData) {
    const mainCompositionRow = <ScheduleRow> selectionData.row;

    const data = {
      from: selectionData.selectedCells[0].date.isoString,
      to:   selectionData.selectedCells[selectionData.selectedCells.length - 1].date.isoString,
      shifts:     this.tableDataSource.shifts,
      positions:  this.tableDataSource.positions,
      employee:   mainCompositionRow.employee,
      mainComposition: mainCompositionRow.compositions[0]
    };

    this.dialog.open(AddSubstitutionCompositionDialogComponent, {data: data})
      .afterClosed()
      .subscribe(value => {
        if (value) {
          const group = mainCompositionRow.group.table.findRowGroup(value.shiftId);
          this.tableCompositionHandler
            .createOrUpdateComposition([value], group, null, mainCompositionRow,
              this.tableDataSource.scheduleDto,
              this.tableDataSource.positions,
              this.tableDataSource.workingNorms,
              this.tableDataSource.calendarDays,
              true);
        }
      });
  }

  private openDialog(data, rowGroup: ScheduleRowGroup, row: ScheduleRow) {
    this.dialog.open(EditCompositionsDialogComponent, {data: data})
      .afterClosed()
      .subscribe((dialogData) => {
        if (!dialogData) {
          return;
        }

        const compositions: Composition[] = dialogData.data;
        switch (dialogData.command) {

          case 'save' : {
            this.tableCompositionHandler
              .createOrUpdateComposition(compositions, rowGroup, row, null,
                this.tableDataSource.scheduleDto,
                this.tableDataSource.positions,
                this.tableDataSource.workingNorms,
                this.tableDataSource.calendarDays,
                row.isSubstitution);
            break;
          }

          case 'delete' : {
            this.tableCompositionHandler
              .removeComposition(rowGroup, row, this.tableDataSource.scheduleDto, compositions);
            break;
          }

          default : {
            throw new Error('Wrong command');
          }
        }
      });
  }
}
