import { forkJoin, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { StatisticsColumnCompositor } from "../../shared/compositor/statistics-column-compositor";
import { ShiftService } from "../../services/http/shift.service";
import { PositionService } from "../../services/http/position.service";
import { SummationColumnDtoService } from "../../services/http/summation-column-dto.service";
import { StatisticsService } from "../../services/http/statistics.service";
import { WorkingNormService } from "../../services/http/working-norm.service";
import { SummationColumn } from "../../model/summation-column";
import { SummationMode } from "../../model/dto/employee-work-stat-dto";
import { Shift } from "../../model/shift";
import { Position } from "../../model/position";
import { StatisticsTableDataCollector } from "./collector/statistics-table-data-collector";
import { Injectable } from "@angular/core";
import { UserAccountDTO, UserAccountLevel } from "../../model/dto/user-account-dto";
import { toIdMap } from "../calendar/utils/scheduler-utility";
import { PaginationService } from "../../shared/paginators/pagination.service";
import { EmployeeService } from "../../services/http/employee.service";
import { Employee } from "../../model/employee";

@Injectable()
export class StatisticsTableSource {

  summationColumns: SummationColumn[];
  shifts:           Shift[];
  employeeMap:      Map<number, Employee>;
  positionMap:      Map<number, Position>;

  constructor(private collector: StatisticsTableDataCollector,
              private paginationService: PaginationService,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private employeeService: EmployeeService,
              private summationColumnDtoService: SummationColumnDtoService,
              private statisticsService: StatisticsService,
              private workingNormService: WorkingNormService) {}

  getTableData(userAccount: UserAccountDTO,
               enterpriseId: number,
               departmentId: number,
               mode: SummationMode) {
    let obs;

    if (userAccount.level === UserAccountLevel.SHIFT) {
      obs = this.byShiftIds(enterpriseId, departmentId, userAccount.shiftIds, mode);
    } else {
      obs = this.byDepartmentId(enterpriseId, departmentId, mode);
    }

    return obs;
  }


  byDepartmentId(enterpriseId: number,
                 departmentId: number,
                 mode: SummationMode) {
    const sources: Observable<any>[] = [
      this.shiftService.getAllByDepartmentId(departmentId),
      this.positionService.getAllByDepartmentId(departmentId),
      this.employeeService.getAllByDepartmentId(departmentId),
      this.summationColumnDtoService.getAllByEnterpriseId(enterpriseId),
    ];

    const fn = dateInterval => {
      const observables = [
        this.statisticsService
          .getSummationDTOMapByDepartmentId(mode, enterpriseId, departmentId, dateInterval.from, dateInterval.to),
        this.workingNormService
          .getAllByDepartmentId(departmentId, dateInterval.from, dateInterval.to)
      ];
      return forkJoin(observables);
    };

    return this.getData(sources, fn);
  }

  byShiftIds(enterpriseId: number,
             departmentId: number,
             shiftIds: number[],
             mode: SummationMode) {
    const sources: Observable<any>[] = [
      this.shiftService.getAllByShiftIds(shiftIds),
      this.positionService.getAllByDepartmentId(departmentId),
      this.employeeService.getAllByDepartmentId(departmentId),
      this.summationColumnDtoService.getAllByEnterpriseId(enterpriseId)
    ];

    const fn = dateInterval => {
      const observables = [
        this.statisticsService
          .getSummationDTOMapByShiftIds(mode, enterpriseId, departmentId, shiftIds, dateInterval.from, dateInterval.to),
        this.workingNormService
          .getAllByDepartmentId(departmentId, dateInterval.from, dateInterval.to)
      ];
      return forkJoin(observables);
    };

    return this.getData(sources, fn);
  }

  private getData(sources: Observable<any>[], fn: (pag) => Observable<any>) {
    return forkJoin(sources).pipe(
      switchMap(([shifts, positions, employees, summationColumns]) => {
        this.shifts = shifts.filter(shift => !shift.hidden);
        this.employeeMap = toIdMap(employees);
        this.positionMap = toIdMap(positions);
        this.summationColumns = summationColumns.map(value => value.parent);
        this.statisticsColumnCompositor.composeColumns(this.summationColumns);

        return this.paginationService.onValueChange
          .pipe(switchMap(fn));
      })
    ).pipe(map(([summationDTOMap, workingNorms]) => {
      this.statisticsColumnCompositor.cr(this.shifts, summationDTOMap, this.summationColumns, workingNorms);

      return this.collector.getTableData(summationDTOMap, this.shifts, this.employeeMap, this.positionMap);
    }));

  }
}
