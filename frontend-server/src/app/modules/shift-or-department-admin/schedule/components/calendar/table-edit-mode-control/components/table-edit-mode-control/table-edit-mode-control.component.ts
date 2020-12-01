import { Component, OnInit } from '@angular/core';
import { TableStateService } from "../../../../../../../../lib/ngx-schedule-table/service/table-state.service";

@Component({
  selector: 'app-table-edit-mode-control',
  templateUrl: './table-edit-mode-control.component.html',
  styleUrls: ['./table-edit-mode-control.component.css']
})
export class TableEditModeControlComponent implements OnInit {

  editableRowGroups: boolean = false;

  constructor(private tableStateService: TableStateService) { }

  ngOnInit(): void {
    this.tableStateService.editableGroupsState
      .subscribe(editableRowGroups => this.editableRowGroups = editableRowGroups);
  }

  click() {
    this.tableStateService.changeEditableGroupsState(!this.editableRowGroups);
  }
}
