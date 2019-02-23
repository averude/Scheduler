import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  department$: Observable<Department>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('departmentId'));
    this.department$ = this.departmentService.getById(id);
  }
}
