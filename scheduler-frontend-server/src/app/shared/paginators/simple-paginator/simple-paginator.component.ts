import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaginationService } from "../../../lib/ngx-schedule-table/service/pagination.service";
import { IdEntity } from "../../../model/interface/id-entity";

@Component({
  selector: 'app-simple-paginator',
  templateUrl: './simple-paginator.component.html',
  styleUrls: ['./simple-paginator.component.css']
})
export class SimplePaginatorComponent implements OnInit, OnChanges {
  curr_index: number = 0;

  @Input() data: IdEntity[];

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      this.change();
    }
  }

  next() {
    if (!this.data || this.data.length <= 0) {
      return;
    }
    if (this.curr_index >= this.data.length - 1) {
      this.curr_index = 0;
    } else {
      ++this.curr_index;
    }
    this.change();
  }

  prev() {
    if (!this.data || this.data.length <= 0) {
      return;
    }
    if (this.curr_index == 0) {
      this.curr_index = this.data.length - 1;
    } else {
      --this.curr_index;
    }
    this.change();
  }

  change() {
    this.paginationService.change(this.data[this.curr_index].id);
  }
}
