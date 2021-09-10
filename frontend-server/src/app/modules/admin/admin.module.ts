import { NgModule } from "@angular/core";
import { AdminComponent } from './admin.component';
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CellCollector } from "../../services/collectors/cell-collector";
import { CellUpdater } from "../../services/collectors/cell-updater";
import { CalendarModule } from "../../components/calendar/calendar.module";
import { SimpleNotificationsModule } from "angular2-notifications";
import { MatMenuModule } from "@angular/material/menu";
import { ChangeUserAccountPasswordDialogModule } from "../../components/user-account-password/change-user-account-password-dialog/change-user-account-password-dialog.module";
import { NgxMaskModule } from "ngx-mask";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { SimpleAccordionModule } from "../../lib/simple-accordion/simple-accordion.module";
import { ToolbarTemplateService } from "../../services/top-bar/toolbar-template.service";
import { ToolbarRowComponent } from './toolbar-row.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SidePanelStepperModule } from "../../lib/side-panel-stepper/side-panel-stepper.module";
import { MonthYearPaginatorModule } from "../../shared/paginators/month-year-paginator/month-year-paginator.module";
import { CalendarDaysCalculator } from "../../services/collectors/calendar-days-calculator";
import { ReportTableSortingStrategy } from "../../shared/table-sorting-strategies/report-table-sorting-strategy";
import { ScheduleTableSortingStrategy } from "../../shared/table-sorting-strategies/schedule-table-sorting-strategy";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    CalendarModule,
    SidePanelStepperModule,
    CdkStepperModule,
    SimpleAccordionModule,
    MonthYearPaginatorModule.forRoot(),
    ChangeUserAccountPasswordDialogModule,
    SimpleNotificationsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    ToolbarRowComponent,
    UserInfoComponent
  ],
  providers: [
    CellCollector,
    CellUpdater,
    ToolbarTemplateService,
    CalendarDaysCalculator,
    ScheduleTableSortingStrategy,
    ReportTableSortingStrategy,
  ]
})
export class AdminModule {
}
