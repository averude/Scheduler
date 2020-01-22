import { Component, OnInit } from '@angular/core';
import { CellStateService } from "../../../../../../lib/ngx-schedule-table/service/cell-state.service";

@Component({
  selector: 'app-show-hours-control',
  templateUrl: './show-hours-control.component.html',
  styleUrls: ['./show-hours-control.component.css']
})
export class ShowHoursControlComponent implements OnInit {

  isShown: number = 0;

  constructor(private cellStateService: CellStateService) { }

  ngOnInit() {
  }

  changeState() {
    this.isShown = this.isShown == 0 ? 1 : 0;
    this.cellStateService.nextStatus(this.isShown);
  }

}
