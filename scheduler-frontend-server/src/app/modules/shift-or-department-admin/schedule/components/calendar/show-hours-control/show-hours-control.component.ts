import { Component, OnDestroy, OnInit } from '@angular/core';
import { CellStateService } from "../../../../../../lib/ngx-schedule-table/service/cell-state.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-show-hours-control',
  templateUrl: './show-hours-control.component.html',
  styleUrls: ['./show-hours-control.component.css']
})
export class ShowHoursControlComponent implements OnInit, OnDestroy {

  isShown: number = 0;

  private stateSub: Subscription;

  constructor(private cellStateService: CellStateService) { }

  ngOnInit() {
    this.stateSub = this.cellStateService.isShown.subscribe(status => this.isShown = status);
  }

  ngOnDestroy(): void {
    if (this.stateSub) this.stateSub.unsubscribe();
  }

  changeState() {
    this.cellStateService.nextStatus(this.isShown == 0 ? 1 : 0);
  }

}
