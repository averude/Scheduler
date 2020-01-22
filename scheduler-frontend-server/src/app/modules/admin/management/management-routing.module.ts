import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from "./components/employees/components/employees-table/employees-table.component";
import { PositionsTableComponent } from "./components/positions/components/positions-table/positions-table.component";
import { DayTypesTableComponent } from "./components/daytypes/components/daytypes-table/daytypes-table.component";
import { PatternsTableComponent } from "./components/patterns/components/patterns-table/patterns-table.component";
import { ShiftsTableComponent } from "./components/shifts/components/shifts-table/shifts-table.component";
import { HolidaysTableComponent } from "./components/holidays/components/holidays-table/holidays-table.component";
import { ExtraWeekendsTableComponent } from "./components/extra-weekends/components/extra-weekends-table/extra-weekends-table.component";
import { ManagementComponent } from "./management/management.component";
import { ExtraWorkdaysTableComponent } from "./components/extra-workdays/components/extra-workdays-table/extra-workdays-table.component";

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'employees',
        component: EmployeesTableComponent
      },
      {
        path: 'positions',
        component: PositionsTableComponent
      },
      {
        path: 'daytypes',
        component: DayTypesTableComponent
      },
      {
        path: 'patterns',
        component: PatternsTableComponent
      },
      {
        path: 'shifts',
        component: ShiftsTableComponent
      },
      {
        path: 'holidays',
        component: HolidaysTableComponent
      },
      {
        path: 'extraweekends',
        component: ExtraWeekendsTableComponent
      },
      {
        path: 'extraworkdays',
        component: ExtraWorkdaysTableComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
