import { TableBaseComponent } from "./table-base.component";
import { IdEntity } from "../../../model/interface/id-entity";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { CUDService } from "../../../http-services/interface/cud-service";
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { IByEnterpriseIdService } from "../../../http-services/interface/i-by-enterprise-id.service";

export abstract class PageableByEnterpriseIdTableBaseComponent<T extends IdEntity> extends TableBaseComponent<T> {

  private sub: Subscription;

  protected constructor(private paginationService: PaginationService,
                        matDialog: MatDialog,
                        private pageableByDateCrudService: IByEnterpriseIdService<T> & CUDService<T>,
                        notification: NotificationsService) {
    super(matDialog, pageableByDateCrudService, notification);
  }

  initDataSourceValues() {
    this.sub = this.paginationService.onValueChange
      .pipe(switchMap(value => {
          return this.pageableByDateCrudService
            .getAllByEnterpriseId(value);
        })
      ).subscribe(values => this.dataSource.data = values);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sub.unsubscribe();
  }
}
