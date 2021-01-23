import { TableBaseComponent } from "./table-base.component";
import { BasicDTO } from "../../../model/dto/basic-dto";
import { IdEntity } from "../../../model/interface/id-entity";
import { NotificationsService } from "angular2-notifications";
import { CUDService } from "../../../services/http/interface/cud-service";
import { MatDialog } from "@angular/material/dialog";
import { Directive } from "@angular/core";

@Directive()
export abstract class DtoTableBaseComponent<P extends IdEntity, C> extends TableBaseComponent<BasicDTO<P, C>> {

  constructor(matDialog: MatDialog,
              crudService: CUDService<BasicDTO<P, C>>,
              notification: NotificationsService) {
    super(matDialog, crudService, notification);
  }

  onCreated(value: BasicDTO<P, C>): (response: BasicDTO<P, C>) => void {
    return res => {
      this.addRow(res);
      this.notification
        .success(
          'Created',
          `Entity was successfully created`)
    }
  }

  onUpdated(value: BasicDTO<P, C>, oldValue: BasicDTO<P, C>): (response: BasicDTO<P, C>) => void {
    return res => {
      this.updateRow(res, oldValue);
      this.notification
        .success(
          'Updated',
          `Entity was successfully updated`);
    }
  }

  removeSelected() {
    this.selection.selected.forEach(value =>
      this.crudService.delete(value.parent.id)
        .subscribe(res => {
          this.removeRow(value);
          this.notification.success(
            'Deleted',
            'Selected values was successfully deleted'
          );
        }));
  }
}
