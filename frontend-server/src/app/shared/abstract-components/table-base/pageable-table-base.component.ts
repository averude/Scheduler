import { TableBaseIdEntityComponent } from "./table-base-id-entity-component.directive";
import { IdEntity } from "../../../model/interface/id-entity";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { CUDService } from "../../../services/http/interface/cud-service";
import { Directive } from "@angular/core";
import { HasEnterpriseIdService } from "../../../services/http/interface/has-enterprise-id.service";
import { PaginationService } from "../../paginators/pagination.service";

@Directive()
export abstract class HasEnterprisePageableTable<T extends IdEntity> extends TableBaseIdEntityComponent<T> {

  private sub: Subscription;

  constructor(private datePaginationService: PaginationService,
              matDialog: MatDialog,
              private enterpriseId: number,
              private hasEnterpriseIdService: CUDService<T> & HasEnterpriseIdService<T>,
              notification: NotificationsService) {
    super(matDialog, hasEnterpriseIdService, notification);
  }

  initDataSourceValues() {
    this.sub = this.datePaginationService.onValueChange
      .pipe(switchMap(value => {
          return this.hasEnterpriseIdService
            .getAllByEnterpriseId(this.enterpriseId, value.from, value.to);
        })
      ).subscribe(values => this.dataSource.data = values);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sub.unsubscribe();
  }
}
