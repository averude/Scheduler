import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableStateService } from "../../../../../../lib/ngx-schedule-table/service/table-state.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-show-hours-control',
  templateUrl: './show-hours-control.component.html',
  styleUrls: ['./show-hours-control.component.css']
})
export class ShowHoursControlComponent implements OnInit, OnDestroy {

  isShown: number = 0;

  private stateSub: Subscription;

  constructor(private cellStateService: TableStateService) { }

  ngOnInit() {
    this.stateSub = this.cellStateService.isCellShown.subscribe(status => this.isShown = status);
  }

  ngOnDestroy(): void {
    if (this.stateSub) this.stateSub.unsubscribe();
  }

  changeState() {
    this.cellStateService.nextCellStatus(this.isShown == 0 ? 1 : 0);
  }

}
