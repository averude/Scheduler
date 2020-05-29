import { Component } from "@angular/core";
import { BasicDto } from "../../../../../model/dto/basic-dto";
import { SummationColumn } from "../../../../../model/summation-column";
import { SummationColumnDayTypeRange } from "../../../../../model/summation-column-day-type-range";
import { MatDialog } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { DayTypeService } from "../../../../../http-services/day-type.service";
import { DayType } from "../../../../../model/day-type";
import { SummationColumnDtoService } from "../../../../../http-services/summation-column-dto.service";
import { SummationColumnDialogComponent } from "../summation-column-dialog/summation-column-dialog.component";
import { DtoTableBaseComponent } from "../../../../../shared/abstract-components/table-base/dto-table-base.component";

@Component({
  selector: 'app-summation-columns-table',
  templateUrl: './summation-columns-table.component.html',
  styleUrls: [
    '../../../../../shared/common/table.common.css',
    './summation-columns-table.component.css'
  ]
})
export class SummationColumnsTableComponent extends DtoTableBaseComponent<SummationColumn, SummationColumnDayTypeRange> {

  displayedColumns = ['select', 'name', 'control'];

  dayTypes: DayType[];

  constructor(private dialog: MatDialog,
              private notificationsService: NotificationsService,
              private dayTypeService: DayTypeService,
              private summationColumnDtoService: SummationColumnDtoService) {
    super(dialog, summationColumnDtoService, notificationsService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dayTypeService.getAllByAuth()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  openDialog(dto: BasicDto<SummationColumn, SummationColumnDayTypeRange>) {
    const data = {
      dto:  dto,
      dayTypes: this.dayTypes
    };

    this.openAddOrEditDialog(dto, data, SummationColumnDialogComponent);
  }
}
