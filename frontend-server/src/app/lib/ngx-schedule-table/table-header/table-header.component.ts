import { Component, Input, OnInit, QueryList } from '@angular/core';
import { AfterDateColumnDef, BeforeDateColumnDef, PageableColumnDef } from "../directives/column";
import { Options } from "../model/options";

@Component({
  selector: '[app-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {

  @Input() options: Options;

  @Input() pageableColumns:   PageableColumnDef;
  @Input() beforeDateColumns: QueryList<BeforeDateColumnDef>;
  @Input() afterDateColumns:  QueryList<AfterDateColumnDef>;

  @Input() headerData: any[] = [];

  constructor() { }

  ngOnInit() {
  }
}
