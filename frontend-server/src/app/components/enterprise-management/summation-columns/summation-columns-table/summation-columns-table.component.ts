import { Component } from "@angular/core";
import { BasicDTO } from "../../../../model/dto/basic-dto";
import { SummationColumn } from "../../../../model/summation-column";
import { SummationColumnDayTypeRange } from "../../../../model/summation-column-day-type-range";
import { MatDialog } from "@angular/material/dialog";
import { NotificationsService } from "angular2-notifications";
import { DayTypeService } from "../../../../services/http/day-type.service";
import { DayType } from "../../../../model/day-type";
import { SummationColumnDtoService } from "../../../../services/http/summation-column-dto.service";
import { SummationColumnDialogComponent } from "../summation-column-dialog/summation-column-dialog.component";
import { HasEnterpriseTableComponent } from "../../../../shared/abstract-components/table-base/table-base-id-entity-component.directive";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../../services/http/auth.service";

@Component({
  selector: 'app-summation-columns-table',
  templateUrl: './summation-columns-table.component.html',
  styleUrls: [
    '../../../../shared/common/table.common.css',
    './summation-columns-table.component.css'
  ]
})
export class SummationColumnsTableComponent extends HasEnterpriseTableComponent<BasicDTO<SummationColumn, SummationColumnDayTypeRange>> {

  displayedColumns = ['select', 'name', 'type', 'special_calendar_date_types', 'control'];

  dayTypes: DayType[];

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private summationColumnDtoService: SummationColumnDtoService,
              private activatedRoute: ActivatedRoute) {
    super(dialog, Number.parseInt(activatedRoute.parent.snapshot.params.enterpriseId),
      summationColumnDtoService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();

    const enterpriseId = this.authService.currentUserAccount.enterpriseId;

    this.dayTypeService.getAllByEnterpriseId(enterpriseId)
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  openDialog(dto: BasicDTO<SummationColumn, SummationColumnDayTypeRange>) {
    const data = {
      dto:  dto,
      dayTypes: this.dayTypes
    };

    this.openAddOrEditDialog(dto, data, SummationColumnDialogComponent);
  }
}
