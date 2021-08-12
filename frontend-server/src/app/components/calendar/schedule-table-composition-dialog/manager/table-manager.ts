import { ScheduleRow, ScheduleRowGroup } from "../../../../model/ui/schedule-table/table-data";
import { Composition, MainComposition } from "../../../../model/composition";
import { getEmployeeShortName } from "../../../../shared/utils/utils";
import { EditCompositionsDialogComponent } from "../edit-compositions-dialog/edit-compositions-dialog.component";
import { SelectionData } from "../../../../lib/ngx-schedule-table/model/selection-data";
import { AddSubstitutionCompositionDialogComponent } from "../add-substitution-composition-dialog/add-substitution-composition-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { InitialData } from "../../../../model/datasource/initial-data";
import { switchMap } from "rxjs/operators";
import { NotificationsService } from "angular2-notifications";
import { TableRenderer } from "../../../../lib/ngx-schedule-table/service/table-renderer.service";
import { TableSumCalculator } from "../../../../services/calculators/table-sum-calculator.service";
import { CellEnabledSetter } from "../../../../services/collectors/schedule/cell-enabled-setter";
import { AddMainCompositionDialogComponent } from "../add-main-composition-dialog/add-main-composition-dialog.component";
import { CompositionHandler } from "../handler/composition-handler";
import { MainCompositionHandler } from "../handler/main-composition-handler";
import { SubstitutionCompositionHandler } from "../handler/substitution-composition-handler";

@Injectable()
export class TableManager {

  constructor(private dialog: MatDialog,
              private tableRenderer: TableRenderer,
              private cellEnabledSetter: CellEnabledSetter,
              private sumCalculator: TableSumCalculator,
              private notificationsService: NotificationsService,
              private mainCompositionHandler: MainCompositionHandler,
              private substitutionCompositionHandler: SubstitutionCompositionHandler) {
  }

  newRow(rowGroup: ScheduleRowGroup, initData: InitialData) {
    const data = {
      shift: rowGroup.value,
      initData: initData
    };

    return this.dialog.open(AddMainCompositionDialogComponent, {data: data})
      .afterClosed()
      .pipe(
        switchMap((mainShiftCompositions: MainComposition[]) => {
          if (!mainShiftCompositions) {
            return;
          }

          return this.mainCompositionHandler
            .createOrUpdate(mainShiftCompositions, rowGroup, null,
              null, data.initData);
        })
      )
      .subscribe(res => {
        this.tableRenderer.renderRowGroup(rowGroup.id);

        res.forEach(row => {
          this.cellEnabledSetter.process(row);
          this.sumCalculator.cal(row, initData.scheduleDTOs);

          this.tableRenderer.nextRowCommand({
            rowId: row.id,
            command: (rowData: ScheduleRow) => this.sumCalculator.cal(rowData, initData.scheduleDTOs)
          });
        });

        this.notificationsService.success('Created');
      });
  }

  editRow(row: ScheduleRow, initData: InitialData) {
    if (!row || !row.group) {
      return;
    }

    const groupData = row.group;
    const data = {
      compositions: row.compositions,
      initData: initData,
      employeeName: getEmployeeShortName(row.employee)
    };

    if (row.isSubstitution) {
      this.openDialog(data, groupData, row, this.substitutionCompositionHandler);
    } else {
      this.openDialog(data, groupData, row, this.mainCompositionHandler);
    }

  }

  addSubstitutionDialog(selectionData: SelectionData, initData: InitialData) {
    const mainCompositionRow = <ScheduleRow>selectionData.row;

    const data = {
      from: selectionData.selectedCells[0].date.isoString,
      to: selectionData.selectedCells[selectionData.selectedCells.length - 1].date.isoString,
      initData: initData,
      employee: mainCompositionRow.employee,
      // TODO: Has to be reworked.
      //  Add ability to check whether date interval of selected data
      //  is within composition's interval
      mainComposition: mainCompositionRow.compositions[0]
    };

    this.dialog.open(AddSubstitutionCompositionDialogComponent, {data: data})
      .afterClosed()
      .pipe(
        switchMap(value => {
          if (value) {
            const destinationGroup = <ScheduleRowGroup>mainCompositionRow.group.table.findRowGroup(value.shiftId);

            return this.substitutionCompositionHandler
              .createOrUpdate([value], destinationGroup, null,
                mainCompositionRow, data.initData);
          }
        })
      )
      .subscribe(res => {
        res.forEach(row => {

          // TODO: Improvement required
          this.cellEnabledSetter.process(row);
          // TODO: It seems like this operation isn't needed
          //  because substitution compositions doesn't play any role
          //  in changing overall row sum
          this.sumCalculator.cal(row, initData.scheduleDTOs);

          this.tableRenderer.renderRowGroup(row.group.id);
          this.tableRenderer.nextRowCommand({
            rowId: row.id,
            command: rowData => this.cellEnabledSetter.process(<ScheduleRow>rowData)
          });
        });
        this.notificationsService.success('Created');
      });
  }

  private openDialog(data, rowGroup: ScheduleRowGroup,
                     row: ScheduleRow,
                     compositionHandler: CompositionHandler<Composition>) {
    this.dialog.open(EditCompositionsDialogComponent, {data: data})
      .afterClosed()
      .subscribe((dialogResult) => {
        if (!dialogResult) {
          return;
        }

        const compositions: Composition[] = dialogResult.data;
        switch (dialogResult.command) {

          case 'save' : {

            compositionHandler
              .createOrUpdate(compositions, rowGroup, row, null, data.initData)
              .subscribe(res => {

                // TODO: Make distinct by id
                res.forEach(row => {
                  this.cellEnabledSetter.process(row);
                  this.sumCalculator.cal(row, data.initData.scheduleDTOs);

                  this.tableRenderer.nextRowCommand({
                    rowId: row.id,
                    command: (rowData: ScheduleRow) => {
                      this.cellEnabledSetter.process(rowData);
                      this.sumCalculator.cal(rowData, data.initData.scheduleDTOs);
                    }
                  });
                });
                this.notificationsService.success('Updated');
              });

            break;
          }

          case 'delete' : {
            compositionHandler
              .remove(rowGroup, row, data.initData, compositions)
              .subscribe(res => {
                this.notificationsService.success('Removed');
              });
            break;
          }

          default : {
            throw new Error('Wrong command');
          }
        }
      });
  }
}
