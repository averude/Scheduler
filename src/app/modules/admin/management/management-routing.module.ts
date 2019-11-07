import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from "./components/employees/components/employees-table/employees-table.component";
import { PositionsTableComponent } from "./components/positions/components/positions-table/positions-table.component";
import { DayTypesTableComponent } from "./components/daytypes/components/daytypes-table/daytypes-table.component";
import { PatternsTableComponent } from "./components/patterns/components/patterns-table/patterns-table.component";
import { ShiftsTableComponent } from "./components/shifts/components/shifts-table/shifts-table.component";
import { HolidaysTableComponent } from "./components/holidays/components/holidays-table/holidays-table.component";
import { WorkingTimeTableComponent } from "./components/working-time/components/working-time-table/working-time-table.component";
import { ExtraWeekendsTableComponent } from "./components/extra-weekends/components/extra-weekends-table/extra-weekends-table.component";
import { ManagementComponent } from "./management/management.component";
import { ShiftCompositionTableComponent } from "./components/shift-composition/components/shift-composition-table/shift-composition-table.component";

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
        path: 'shiftcomposition',
        component: ShiftCompositionTableComponent
      },
      {
        path: 'holidays',
        component: HolidaysTableComponent
      },
      {
        path: 'workingtime',
        component: WorkingTimeTableComponent
      },
      {
        path: 'extraweekends',
        component: ExtraWeekendsTableComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
