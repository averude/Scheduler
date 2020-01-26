import { TableBaseComponent } from "./table-base.component";
import { IdEntity } from "../../../model/interface/id-entity";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IByAuthAndDateService } from "../../../http-services/interface/i-by-auth-and-date.service";
import { CUDService } from "../../../http-services/interface/cud-service";
import { DatePaginationService } from "../../../lib/ngx-schedule-table/service/date-pagination.service";

export abstract class PageableTableBaseComponent<T extends IdEntity> extends TableBaseComponent<T> {

  private sub: Subscription;

  protected constructor(private datePaginationService: DatePaginationService,
                        matDialog: MatDialog,
                        private pageableByDateCrudService: IByAuthAndDateService<T> & CUDService<T>,
                        notification: NotificationsService) {
    super(matDialog, pageableByDateCrudService, notification);
  }

  initDataSourceValues() {
    this.sub = this.datePaginationService.dates
      .pipe(switchMap(value => {
        return this.pageableByDateCrudService
            .getAllByAuthAndDateBetween(value.from, value.to);
        })
      ).subscribe(values => this.dataSource.data = values);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sub.unsubscribe();
  }
}
