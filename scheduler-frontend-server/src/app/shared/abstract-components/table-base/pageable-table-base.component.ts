import { TableBaseComponent } from "./table-base.component";
import { IdEntity } from "../../../model/interface/id-entity";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { CUDService } from "../../../http-services/interface/cud-service";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { IByAuthService } from "../../../http-services/interface/i-by-auth.service";

export abstract class PageableTableBaseComponent<T extends IdEntity> extends TableBaseComponent<T> {

  private sub: Subscription;

  protected constructor(private datePaginationService: PaginationService,
                        matDialog: MatDialog,
                        private pageableByDateCrudService: IByAuthService<T> & CUDService<T>,
                        notification: NotificationsService) {
    super(matDialog, pageableByDateCrudService, notification);
  }

  initDataSourceValues() {
    this.sub = this.datePaginationService.onValueChange
      .pipe(switchMap(value => {
        return this.pageableByDateCrudService
            .getAll(value.from, value.to);
        })
      ).subscribe(values => this.dataSource.data = values);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sub.unsubscribe();
  }
}
