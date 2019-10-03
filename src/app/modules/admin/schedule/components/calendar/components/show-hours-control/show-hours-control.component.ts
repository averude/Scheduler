import { Component, OnInit } from '@angular/core';
import { ShowHoursService } from "./show-hours.service";

@Component({
  selector: 'app-show-hours-control',
  templateUrl: './show-hours-control.component.html',
  styleUrls: ['./show-hours-control.component.css']
})
export class ShowHoursControlComponent implements OnInit {

  isShown: boolean = false;

  constructor(private showHoursService: ShowHoursService) { }

  ngOnInit() {
  }

  changeState() {
    this.isShown = !this.isShown;
    this.showHoursService.show(this.isShown)
  }

}
