import { Component, OnInit } from '@angular/core';
import { DayType } from '../../../../../../../model/daytype';
import { DayTypeService } from '../../../../../../../services/daytype.service';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-daytypes-table',
  templateUrl: './daytypes-table.component.html',
  styleUrls: ['./daytypes-table.component.css']
})
export class DayTypesTableComponent implements OnInit {

  dayTypes: DayType[];

  constructor(private dayTypeService: DayTypeService,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.dayTypeService.getAll()
      .subscribe(dayTypes => this.dayTypes = dayTypes);
  }

  addDayType(dayType: DayType) {
    this.dayTypeService.create(dayType)
      .subscribe(res => {
        dayType.id = res;
        this.dayTypes.push(dayType);
        this.notificationService.success(
          'Created',
          `Day type "${dayType.name}" was successfully created`
        );
      });
  }

  updateDayType(dayType: DayType) {
    this.dayTypeService.update(dayType)
      .subscribe(res => this.notificationService.success(
        'Updated',
        `Day type "${dayType.name}" was successfully updated`
      ));
  }

  deleteDayType(dayType: DayType) {
    this.dayTypeService.delete(dayType.id)
      .subscribe(res => {
        this.dayTypes = this.dayTypes
          .filter(type => type !== dayType);
        this.notificationService.success(
          'Deleted',
          `Day type "${dayType.name}" was successfully deleted`
        );
      });
  }
}
