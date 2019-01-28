import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../../../model/department';
import { DepartmentService } from '../../../services/department.service';
import { switchMap } from 'rxjs/internal/operators';

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
    // this.department$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.departmentService
    //       .getById(Number.parseInt(params.get('departmentId'))))
    // );
    const id = Number.parseInt(this.route.snapshot.paramMap.get('departmentId'));
    this.department$ = this.departmentService.getById(id);
  }
}
