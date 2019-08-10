import { Component, OnInit } from '@angular/core';
import { DepartmentIconService } from "../../../../../services/department-icon.service";
import { DepartmentIcon } from "../../../../../model/department-icon";

@Component({
  selector: 'app-department-icons-table',
  templateUrl: './department-icons-table.component.html',
  styleUrls: ['./department-icons-table.component.css']
})
export class DepartmentIconsTableComponent implements OnInit {

  icons: DepartmentIcon[] = [];
  selectedFile: File;

  constructor(private departmentIconService: DepartmentIconService) { }

  ngOnInit() {
    this.departmentIconService.getAll()
      .subscribe(icons => this.icons = icons);
  }

  selectFile(event) {
    console.log(event.target.files.item(0));
    this.selectedFile = event.target.files.item(0);
  }

  upload() {
    this.departmentIconService.upload(this.selectedFile).subscribe(res => console.log(res));
  }

  remove(departmentIcon: DepartmentIcon) {
    this.departmentIconService.delete(departmentIcon.id).subscribe(res => console.log(res));
  }
}
