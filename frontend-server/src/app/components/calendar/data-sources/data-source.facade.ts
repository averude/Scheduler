import { map } from "rxjs/operators";
import { SecurityConfiguration } from "./security/security-configuration";
import { Observable } from "rxjs";
import { InitialData } from "../../../model/datasource/initial-data";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { TableDataCollector } from "../../../shared/collectors/table-data-collector";
import { Inject, Injectable } from "@angular/core";
import { SCHEDULE_COLLECTOR_HANDLERS } from "../collector/table-collector.module";
import { CollectorHandler } from "../../../shared/collectors/collector-handler";
import { UIPrioritySortingStrategy } from "../utils/ui-priority-sorting-strategy";
import { ScheduleTableSortingStrategy } from "../../../shared/table-sorting-strategies/schedule-table-sorting-strategy";
import { ScheduleFilteringStrategy } from "../utils/schedule-filtering-strategy";
import { UserAccountDTO } from "../../../model/dto/user-account-dto";

@Injectable()
export class DataSourceFacade {

  constructor(private securityConfig: SecurityConfiguration,
              private tableDataCollector: TableDataCollector,
              @Inject(SCHEDULE_COLLECTOR_HANDLERS) private handlers: CollectorHandler[],
              private sortingStrategy: UIPrioritySortingStrategy,
              private tableSortingStrategy: ScheduleTableSortingStrategy,
              private filteringStrategy: ScheduleFilteringStrategy) {}

  getData(enterpriseId: number,
          departmentId: number,
          userAccount: UserAccountDTO): Observable<[InitialData, TableData]> {
    return this.securityConfig
      .getHandler(userAccount)
      .getInitialData(enterpriseId, departmentId, userAccount)
      .pipe(
        map(initData => {
          const data = this.tableDataCollector.collect(initData, this.handlers, this.tableSortingStrategy);
          data.groupSortingStrategy = this.sortingStrategy;
          data.filteringStrategy = this.filteringStrategy;
          return [initData, data];
        })
      );
  }

}
