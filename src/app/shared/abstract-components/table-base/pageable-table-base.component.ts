import { TableBaseComponent } from "./table-base.component";
import { IdEntity } from "../../../model/interface/id-entity";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { PageableByDateCrudService } from "../../../services/interface/pageable-by-date-crud.service";
import { switchMap } from "rxjs/operators";
import { PaginatorService } from "../../paginators/paginator.service";
import { Subscription } from "rxjs";

export abstract class PageableTableBaseComponent<T extends IdEntity> extends TableBaseComponent<T> {

  private sub: Subscription;

  protected constructor(private paginatorService: PaginatorService,
                        matDialog: MatDialog,
                        private pageableByDateCrudService: PageableByDateCrudService<T>,
                        notification: NotificationsService) {
    super(matDialog, pageableByDateCrudService, notification);
  }

  initDataSourceValues() {
    this.sub = this.paginatorService.dates
      .pipe(switchMap(value => {
        return this.pageableByDateCrudService
            .getAllByDate(value.from, value.to);
        })
      ).subscribe(values => this.dataSource.data = values);
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sub.unsubscribe();
  }
}
