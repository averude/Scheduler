import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { TableRenderer } from "../../../lib/ngx-schedule-table/service/table-renderer.service";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-schedule-table-filter',
  templateUrl: './schedule-table-filter.component.html',
  styleUrls: ['./schedule-table-filter.component.css']
})
export class ScheduleTableFilterComponent implements OnInit, OnDestroy {

  @Input() tableData: TableData;

  private filterSubject: Subject<string> = new Subject();
  private filterSubscription: Subscription;

  constructor(private tableRenderer: TableRenderer) { }

  ngOnInit(): void {
    this.filterSubscription = this.filterSubject
      .asObservable()
      .pipe(debounceTime(1000))
      .subscribe(value => this.onFilter(value));
  }

  ngOnDestroy(): void {
    this.onFilter(null);

    this.filterSubscription.unsubscribe();
  }

  onKeyUp(value: string) {
    this.filterSubject.next(value);
  }

  private onFilter(value: string) {

    if (!value) {
      this.clear();
    } else {
      this.tableData.forEachRow((row: ScheduleRow) => {
        row.hidden = !this.filter(row, value);
      });
    }

    this.tableRenderer.renderAllRowGroups();
  }

  private filter(row: ScheduleRow, value: string) {
    return row.employee.secondName.toLowerCase().includes(value.toLowerCase())
      || row.employee.firstName.toLowerCase().includes(value.toLowerCase())
      || row.employee.patronymic.toLowerCase().includes(value.toLowerCase())
      || row.position.name.toLowerCase().includes(value.toLowerCase())
      || row.position.shortName.toLowerCase().includes(value.toLowerCase());
  }

  private clear() {
    this.tableData.forEachRow((row: ScheduleRow) => {
      row.hidden = false;
    });
  }
}
